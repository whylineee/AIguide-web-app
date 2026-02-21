"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, IconButton, Button, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useSettings } from '@/app/contexts/SettingsContext';
import Link from 'next/link';

const data = [
    { name: 'Mon', executions: 400 },
    { name: 'Tue', executions: 300 },
    { name: 'Wed', executions: 550 },
    { name: 'Thu', executions: 480 },
    { name: 'Fri', executions: 700 },
    { name: 'Sat', executions: 850 },
    { name: 'Sun', executions: 980 },
];

const recentActivities = [
    { id: 1, action: "Workflow 'Daily Summary' completed successfully", time: "2 hours ago", color: "#10b981", type: "workflow" },
    { id: 2, action: "Agent 'Customer Support' interacted with 45 users", time: "5 hours ago", color: "#8b5cf6", type: "agent" },
    { id: 3, action: "Team 'Sales Squad' deployed via API", time: "1 day ago", color: "#f59e0b", type: "team" },
    { id: 4, action: "New agent 'Data Analyzer' created", time: "2 days ago", color: "#3B82F6", type: "system" },
];

export default function DashboardHome() {
    const { t } = useSettings();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { title: "Total Agents", value: "8", increase: "+2 this week", icon: <SmartToyIcon sx={{ fontSize: 32, color: '#3B82F6' }} />, gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)" },
        { title: "Agent Teams", value: "3", increase: "Active Squads", icon: <GroupsIcon sx={{ fontSize: 32, color: '#f59e0b' }} />, gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)" },
        { title: "Active Workflows", value: "12", increase: "+4 this week", icon: <PlayCircleOutlineIcon sx={{ fontSize: 32, color: '#10b981' }} />, gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)" },
        { title: "Executions", value: "4,260", increase: "+18% this month", icon: <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />, gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)" },
    ];

    if (!mounted) return <Box sx={{ p: 4 }}>Loading...</Box>;

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
                {stats.map((stat, i) => (
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: stat.title === 'Executions' ? '#10b981' : 'text.disabled' }}>
                                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
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
                                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                                                    {activity.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Button fullWidth sx={{ mt: 4, borderRadius: 2 }} color="inherit">
                                    View All Logs
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}
