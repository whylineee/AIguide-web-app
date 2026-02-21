"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, AvatarGroup, Modal, TextField, MenuItem, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function TeamsPage() {
    const supabase = createClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [teams, setTeams] = useState<any[]>([]);
    const [availableAgents, setAvailableAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamGoal, setNewTeamGoal] = useState('');
    const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const [teamsRes, agentsRes] = await Promise.all([
                supabase.from('teams').select('*').order('created_at', { ascending: false }),
                supabase.from('agents').select('*')
            ]);

            if (teamsRes.data) setTeams(teamsRes.data);
            if (agentsRes.data) setAvailableAgents(agentsRes.data);
        }
        setLoading(false);
    };

    const handleCreateTeam = async () => {
        if (!newTeamName.trim()) return;
        setIsCreating(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { error } = await supabase.from('teams').insert({
                user_id: session.user.id,
                name: newTeamName,
                goal: newTeamGoal,
                agents: selectedAgents,
                status: 'active'
            });

            if (!error) {
                setOpenDialog(false);
                setNewTeamName('');
                setNewTeamGoal('');
                setSelectedAgents([]);
                fetchData();
            }
        }
        setIsCreating(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to disband squad: ${name}?`)) return;

        await supabase.from('teams').delete().eq('id', id);
        fetchData();
    };

    if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Agent Teams
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AutoFixHighIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ background: 'linear-gradient(45deg, #7C3AED 30%, #5B21B6 90%)' }}
                >
                    Assemble Team
                </Button>
            </Box>

            <Typography variant="body1" color="text.secondary" mb={4} maxWidth={700}>
                Combine multiple AI agents into specialized squads. They will share context, collaborate on complex workflows, and execute tasks iteratively until the objective is completed.
            </Typography>

            {teams.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <Typography color="text.secondary">No teams found. Assemble your first squad!</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', background: 'transparent' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                            <TableRow>
                                <TableCell><strong>Squad Name</strong></TableCell>
                                <TableCell><strong>Objective / Goal</strong></TableCell>
                                <TableCell><strong>Agents Assigned</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((team, idx) => (
                                <TableRow key={team.id} hover component={motion.tr} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                                    <TableCell sx={{ fontWeight: 600 }}>{team.name}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {team.goal}
                                    </TableCell>
                                    <TableCell>
                                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem', bgcolor: '#3B82F6' } }}>
                                            {team.agents?.map((agentId: string) => {
                                                const agentName = availableAgents.find(a => a.id === agentId)?.name || 'Agent';
                                                return <Avatar key={agentId} alt={agentName} title={agentName}><SmartToyIcon fontSize="small" /></Avatar>;
                                            })}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={team.status}
                                            color={team.status === 'active' ? 'success' : 'warning'}
                                            variant="filled"
                                            sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary" title="Deploy Squad" onClick={() => alert("Deploying " + team.name)}>
                                            <PlayArrowIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error" title="Disband Squad" onClick={() => handleDelete(team.id, team.name)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 600 }, bgcolor: 'background.paper', borderRadius: 4, p: 4,
                    boxShadow: 24, border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">New Agent Squad</Typography>
                        <IconButton onClick={() => setOpenDialog(false)}><CloseIcon /></IconButton>
                    </Box>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Squad Name"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            placeholder="e.g. Marketing Task Force"
                        />
                        <TextField
                            fullWidth
                            label="Primary Objective"
                            multiline
                            rows={3}
                            value={newTeamGoal}
                            onChange={(e) => setNewTeamGoal(e.target.value)}
                            placeholder="Describe the goal this team should achieve..."
                        />

                        <TextField
                            select
                            fullWidth
                            label="Select Agents"
                            value={selectedAgents}
                            onChange={(e) => setSelectedAgents(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[])}
                            SelectProps={{ multiple: true }}
                            helperText="Select one or more agents"
                        >
                            {availableAgents.map((agent) => (
                                <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                            ))}
                            {availableAgents.length === 0 && <MenuItem disabled>No agents found</MenuItem>}
                        </TextField>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleCreateTeam}
                            disabled={!newTeamName || isCreating}
                            sx={{ mt: 2, background: 'linear-gradient(45deg, #7C3AED 30%, #5B21B6 90%)' }}
                        >
                            {isCreating ? 'Assembling...' : 'Assemble Team'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
