"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function WorkflowsPage() {
    const [started, setStarted] = useState<string | null>(null);

    const workflows = [
        { id: '1', name: 'Daily Telegram Summary', trigger: 'Schedule', status: 'active', lastRun: '10 mins ago' },
        { id: '2', name: 'Incoming Support Ticket', trigger: 'Webhook', status: 'active', lastRun: 'an hour ago' },
        { id: '3', name: 'Weekly Analytics Report', trigger: 'Schedule', status: 'paused', lastRun: '2 days ago' },
    ];

    const handleRun = (name: string) => {
        setStarted(`Started workflow: ${name}`);
        setTimeout(() => setStarted(null), 3000);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Workflows
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Create Workflow
                </Button>
            </Box>

            {started && <Alert severity="info" sx={{ mb: 3 }}>{started}</Alert>}

            <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell><strong>Workflow Name</strong></TableCell>
                            <TableCell><strong>Trigger</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Last Run</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workflows.map((workflow) => (
                            <TableRow key={workflow.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{workflow.name}</TableCell>
                                <TableCell><Chip size="small" label={workflow.trigger} variant="outlined" /></TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={workflow.status}
                                        color={workflow.status === 'active' ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{workflow.lastRun}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" color="primary" title="Run Now" onClick={() => handleRun(workflow.name)}>
                                        <PlayArrowIcon />
                                    </IconButton>
                                    <IconButton size="small" title="Edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" title="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
