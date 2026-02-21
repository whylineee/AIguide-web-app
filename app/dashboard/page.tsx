"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, IconButton, Button, CircularProgress } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useSettings } from '@/app/contexts/SettingsContext';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function DashboardHome() {
    const { t } = useSettings();
    const supabase = createClient();

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ agents: 0, teams: 0, workflows: 0, executions: 0 });
    const [recentActivities, setRecentActivities] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            // Fetch counts
            const [agentsRes, teamsRes, workflowsRes, execsRes] = await Promise.all([
                supabase.from('agents').select('*', { count: 'exact', head: true }),
                supabase.from('teams').select('*', { count: 'exact', head: true }),
                supabase.from('workflows').select('*', { count: 'exact', head: true }),
                supabase.from('executions').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                agents: agentsRes.count || 0,
                teams: teamsRes.count || 0,
                workflows: workflowsRes.count || 0,
                executions: execsRes.count || 0
            });

            // Fetch recent executions
            const { data: recentExecs } = await supabase
                .from('executions')
                .select('*, agents(name), workflows(name)')
                .order('started_at', { ascending: false })
                .limit(4);

            if (recentExecs) {
                const logs = recentExecs.map(exec => {
                    const itemName = exec.workflows?.name || exec.agents?.name || 'Task';
                    const isSuccess = exec.status === 'success';

                    return {
                        id: exec.id,
                        action: `${isSuccess ? 'Completed' : 'Running'} ${itemName}`,
                        status: exec.status,
                        time: new Date(exec.started_at).toLocaleDateString(),
                        color: isSuccess ? "#10b981" : "#8b5cf6"
                    };
                });
                setRecentActivities(logs);
            }
        }
        setLoading(false);
    };

    const dummyChartData = [
        { name: 'Mon', executions: 5 },
        { name: 'Tue', executions: 8 },
        { name: 'Wed', executions: Math.max(stats.executions / 2, 4) },
        { name: 'Thu', executions: Math.max(stats.executions, 2) },
        { name: 'Fri', executions: stats.executions + 5 },
        { name: 'Sat', executions: stats.executions + 10 },
        { name: 'Sun', executions: stats.executions + 2 },
    ];

    const statsCards = [
        { title: "Total Agents", value: stats.agents, increase: "Your AI workforce", icon: <SmartToyIcon sx={{ fontSize: 32, color: '#3B82F6' }} />, gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)" },
        { title: "Agent Teams", value: stats.teams, increase: "Active Squads", icon: <GroupsIcon sx={{ fontSize: 32, color: '#f59e0b' }} />, gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)" },
        { title: "Workflows", value: stats.workflows, increase: "Scheduled Tasks", icon: <PlayCircleOutlineIcon sx={{ fontSize: 32, color: '#10b981' }} />, gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)" },
        { title: "Executions", value: stats.executions, increase: "Total runs", icon: <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />, gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)" },
    ];

    if (!mounted || loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="800" sx={{ background: 'linear-gradient(45deg, #7C3AED 30%, #3B82F6 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Welcome back, {t.common.dashboard}
                </Typography>
                <Link href="/dashboard/agents/new" passHref legacyBehavior>
                    <Button variant="contained" sx={{ borderRadius: 2, background: 'linear-gradient(45deg, #7C3AED 30%, #5B21B6 90%)' }}>
                        + Quick Create
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={3} mb={4}>
                {statsCards.map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                            <Card sx={{
                                borderRadius: 4,
                                background: stat.gradient,
                                border: '1px solid rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }
                            }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' }}>
                                            {stat.icon}
                                        </Box>
                                        <IconButton size="small"><MoreVertIcon /></IconButton>
                                    </Box>
                                    <Typography variant="h3" fontWeight="900" gutterBottom>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>
                                        {stat.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                        <Typography variant="caption" fontWeight="500">{stat.increase}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* Chart Section */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <Card sx={{ borderRadius: 4, height: '100%', p: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" mb={3}>
                                    Workflow Executions (7 Days)
                                </Typography>
                                <Box sx={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={dummyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorEx" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: 12, border: 'none', backgroundColor: 'rgba(17, 24, 39, 0.9)', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="executions" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorEx)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                {/* Recent Activity List */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <Card sx={{ borderRadius: 4, height: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" mb={3}>
                                    Recent Activity
                                </Typography>
                                {recentActivities.length === 0 ? (
                                    <Typography color="text.secondary">No recent executions found.</Typography>
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {recentActivities.map((activity) => (
                                            <Box key={activity.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <Box sx={{
                                                    width: 12, height: 12, borderRadius: '50%', bgcolor: activity.color, mt: 0.75, mr: 2, flexShrink: 0,
                                                    boxShadow: `0 0 10px ${activity.color}`
                                                }} />
                                                <Box>
                                                    <Typography variant="body2" fontWeight="500" sx={{ mb: 0.5 }}>
                                                        {activity.action}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {activity.time} • {activity.status}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                                <Link href="/dashboard/logs" passHref legacyBehavior>
                                    <Button fullWidth sx={{ mt: 4, borderRadius: 2 }} color="inherit">
                                        View All Logs
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}
