"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import { createClient } from '@/lib/supabase/client';

export default function WorkflowsPage() {
    const supabase = createClient();
    const [workflows, setWorkflows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState<string | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newWorkflowName, setNewWorkflowName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { data } = await supabase
                .from('workflows')
                .select('*')
                .order('created_at', { ascending: false });
            if (data) setWorkflows(data);
        }
        setLoading(false);
    };

    const handleCreateWorkflow = async () => {
        if (!newWorkflowName.trim()) return;
        setIsCreating(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { error } = await supabase.from('workflows').insert({
                name: newWorkflowName,
                user_id: session.user.id,
                definition: {},
                is_active: true
            });

            if (!error) {
                setNewWorkflowName('');
                setIsModalOpen(false);
                fetchWorkflows();
            }
        }
        setIsCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this workflow?')) return;

        await supabase.from('workflows').delete().eq('id', id);
        fetchWorkflows();
    };

    const handleRun = async (workflow: any) => {
        setStarted(`Started workflow: ${workflow.name}`);

        // Post to the executions table
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await supabase.from('executions').insert({
                user_id: session.user.id,
                workflow_id: workflow.id,
                status: 'pending',
                started_at: new Date().toISOString()
            });
        }

        setTimeout(() => setStarted(null), 3000);
    }

    if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

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
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Workflow
                </Button>
            </Box>

            {started && <Alert severity="info" sx={{ mb: 3 }}>{started}</Alert>}

            {workflows.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <Typography color="text.secondary">No workflows found. Create one to get started.</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell><strong>Workflow Name</strong></TableCell>
                                <TableCell><strong>Trigger</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Created At</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workflows.map((workflow) => (
                                <TableRow key={workflow.id} hover>
                                    <TableCell sx={{ fontWeight: 500 }}>{workflow.name}</TableCell>
                                    <TableCell><Chip size="small" label="Manual" variant="outlined" /></TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={workflow.is_active ? 'active' : 'paused'}
                                            color={workflow.is_active ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {new Date(workflow.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary" title="Run Now" onClick={() => handleRun(workflow)}>
                                            <PlayArrowIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error" title="Delete" onClick={() => handleDelete(workflow.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Create Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Workflow Name"
                        fullWidth
                        variant="outlined"
                        value={newWorkflowName}
                        onChange={(e) => setNewWorkflowName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateWorkflow}
                        disabled={!newWorkflowName.trim() || isCreating}
                    >
                        {isCreating ? 'Creating...' : 'Create Workflow'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
