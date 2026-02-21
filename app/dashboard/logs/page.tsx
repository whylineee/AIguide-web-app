"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { createClient } from '@/lib/supabase/client';

export default function LogsPage() {
    const supabase = createClient();

    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchLogs();
    }, [statusFilter]);

    const fetchLogs = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            let query = supabase
                .from('executions')
                .select('*, agents(name), workflows(name)')
                .eq('user_id', session.user.id)
                .order('started_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data } = await query;

            if (data) {
                setLogs(data.map(exec => {
                    const itemName = exec.workflows?.name || exec.agents?.name || 'Manual Task';

                    return {
                        id: exec.id,
                        time: new Date(exec.started_at).toLocaleString(),
                        agent: itemName,
                        event: exec.status === 'success' ? 'Completed Successfully' : (exec.status === 'failed' ? 'Failed Execution' : 'In Progress'),
                        status: exec.status,
                        duration: exec.finished_at ? `${((new Date(exec.finished_at).getTime() - new Date(exec.started_at).getTime()) / 1000).toFixed(1)}s` : '-'
                    };
                }));
            }
        }
        setLoading(false);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold">Execution Logs</Typography>
                <Button variant="outlined" startIcon={<GetAppIcon />} onClick={() => alert("Downloading CSV... (Not implemented)")}>Export CSV</Button>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent' }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        select
                        size="small"
                        label="Filter Status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ width: 150 }}
                    >
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="success">Success</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </TextField>
                    <Button variant="contained" color="primary" startIcon={<FilterListIcon />} onClick={fetchLogs}>Refresh Logs</Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
                ) : logs.length === 0 ? (
                    <Typography color="text.secondary" textAlign="center">No logs found.</Typography>
                ) : (
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
                                                icon={log.status === 'success' ? <CheckCircleIcon /> : (log.status === 'failed' ? <ErrorIcon /> : undefined)}
                                                label={log.status}
                                                color={log.status === 'success' ? 'success' : (log.status === 'failed' ? 'error' : 'secondary')}
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
                )}
            </Paper>
        </Box>
    );
}
