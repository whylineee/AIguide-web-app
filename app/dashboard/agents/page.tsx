"use client"

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

// Mock data until Supabase is fully connected
const agents = [
    { id: '1', name: 'Customer Support Bot', type: 'llm', status: 'active', model: 'gpt-4o' },
    { id: '2', name: 'Sales Qualifier', type: 'telegram', status: 'paused', model: 'gpt-3.5-turbo' },
    { id: '3', name: 'Email Summarizer', type: 'automation', status: 'active', model: 'claude-3-opus' },
];

export default function AgentsPage() {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    AI Agents
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    LinkComponent={Link}
                    href="/dashboard/agents/new"
                >
                    Create Agent
                </Button>
            </Box>

            <Grid container spacing={3}>
                {agents.map((agent) => (
                    <Grid item xs={12} sm={6} md={4} key={agent.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 3,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                            }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip
                                        label={agent.status}
                                        color={agent.status === 'active' ? 'success' : 'default'}
                                        size="small"
                                    />
                                    <Chip
                                        label={agent.type.toUpperCase()}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {agent.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Model: {agent.model}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ borderTop: 1, borderColor: 'divider', px: 2, py: 1 }}>
                                <Button size="small" startIcon={<PlayArrowIcon />} component={Link} href={`/dashboard/agents/${agent.id}`}>
                                    Test Run
                                </Button>
                                <Box sx={{ flexGrow: 1 }} />
                                <IconButton size="small" title="Settings">
                                    <SettingsIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error" title="Delete">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
