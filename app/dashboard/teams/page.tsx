"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, AvatarGroup, Modal, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from 'framer-motion';

export default function TeamsPage() {
    const [openDialog, setOpenDialog] = useState(false);

    const teams = [
        { id: '1', name: 'Alpha Sales Squad', status: 'active', agents: ['Lead Gen Bot', 'Email Outreach', 'CRM Updater'], goal: 'Maximize outbound reach' },
        { id: '2', name: 'Tier 1 Support', status: 'active', agents: ['Ticketing AI', 'Sentiment Analyzer'], goal: 'Resolve 80% of L1 tickets automatically' },
        { id: '3', name: 'Data Pipeline', status: 'training', agents: ['Data Scraper', 'JSON Formatter'], goal: 'Daily web data extraction' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Agent Teams
                    <Chip label="BETA" color="secondary" size="small" sx={{ ml: 1, fontWeight: 'bold' }} />
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
                                        {team.agents.map((agent) => (
                                            <Avatar key={agent} alt={agent} title={agent}><SmartToyIcon fontSize="small" /></Avatar>
                                        ))}
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
                                    <IconButton size="small" color="primary" title="Deploy Squad">
                                        <PlayArrowIcon />
                                    </IconButton>
                                    <IconButton size="small" title="Edit Configuration">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" title="Disband Squad">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                    <Typography color="text.secondary" mb={3}>Select multiple agents and define a unified objective for them to collaborate on.</Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField fullWidth label="Squad Name" placeholder="e.g. Marketing Task Force" />
                        <TextField fullWidth label="Primary Objective" multiline rows={3} placeholder="Describe the goal this team should achieve..." />

                        <TextField
                            select
                            fullWidth
                            label="Select Agents (Mock)"
                            defaultValue="1"
                            helperText="Hold CTRL/CMD to select multiple in a real implementation"
                        >
                            <MenuItem value="1">Customer Support Bot</MenuItem>
                            <MenuItem value="2">Data Analyzer</MenuItem>
                            <MenuItem value="3">Email Assistant</MenuItem>
                        </TextField>

                        <Button variant="contained" size="large" onClick={() => setOpenDialog(false)} sx={{ mt: 2, background: 'linear-gradient(45deg, #7C3AED 30%, #5B21B6 90%)' }}>
                            Assemble Team
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
