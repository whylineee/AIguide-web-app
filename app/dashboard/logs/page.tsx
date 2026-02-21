"use client";

import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, TextField, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function LogsPage() {
    const logs = [
        { id: 1, time: '2026-02-21 16:45:10', agent: 'Customer Support Bot', event: 'Message Handled', status: 'success', duration: '1.2s' },
        { id: 2, time: '2026-02-21 16:40:05', agent: 'Data Analyzer', event: 'Web Scraping', status: 'error', duration: '45.0s' },
        { id: 3, time: '2026-02-21 16:15:22', agent: 'Email Assistant', event: 'Summary Generated', status: 'success', duration: '3.4s' },
        { id: 4, time: '2026-02-21 15:30:00', agent: 'Customer Support Bot', event: 'Message Handled', status: 'success', duration: '0.8s' },
        { id: 5, time: '2026-02-21 14:12:33', agent: 'Lead Gen Bot', event: 'LinkedIn Outreach', status: 'success', duration: '5.1s' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold">Execution Logs</Typography>
                <Button variant="outlined" startIcon={<GetAppIcon />}>Export CSV</Button>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent' }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField select size="small" label="Filter Status" defaultValue="all" sx={{ width: 150 }}>
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="success">Success</MenuItem>
                        <MenuItem value="error">Error</MenuItem>
                    </TextField>
                    <TextField select size="small" label="Agent" defaultValue="all" sx={{ width: 200 }}>
                        <MenuItem value="all">Any Agent</MenuItem>
                        <MenuItem value="cs">Customer Support</MenuItem>
                        <MenuItem value="da">Data Analyzer</MenuItem>
                    </TextField>
                    <Button variant="contained" color="primary" startIcon={<FilterListIcon />}>Apply filters</Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Agent / System</TableCell>
                                <TableCell>Event</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id} hover>
                                    <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{log.time}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{log.agent}</TableCell>
                                    <TableCell>{log.event}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={log.status === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
                                            label={log.status}
                                            color={log.status === 'success' ? 'success' : 'error'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: 'text.secondary' }}>{log.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
