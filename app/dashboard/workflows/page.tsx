"use client"

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';

const workflows = [
    { id: '1', name: 'New Lead Auto-Reply', active: true, trigger: 'Webhook', steps: 3, lastRun: '2 mins ago' },
    { id: '2', name: 'Support Ticket Escalation', active: true, trigger: 'Telegram', steps: 5, lastRun: '1 hour ago' },
    { id: '3', name: 'Daily Morning Summary', active: false, trigger: 'Schedule', steps: 2, lastRun: 'Yesterday' },
];

export default function WorkflowsPage() {
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

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Trigger</strong></TableCell>
                            <TableCell><strong>Steps</strong></TableCell>
                            <TableCell><strong>Last Run</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workflows.map((wf) => (
                            <TableRow key={wf.id} hover>
                                <TableCell>{wf.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={wf.active ? 'Active' : 'Paused'}
                                        size="small"
                                        color={wf.active ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell>{wf.trigger}</TableCell>
                                <TableCell>{wf.steps}</TableCell>
                                <TableCell>{wf.lastRun}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" color="primary" title="Run Now">
                                        <PlayArrowIcon />
                                    </IconButton>
                                    <IconButton size="small" title="Settings">
                                        <SettingsIcon />
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
