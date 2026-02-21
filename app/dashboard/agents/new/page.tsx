"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, MenuItem, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Link from 'next/link';

export default function CreateAgentPage() {
    const [name, setName] = useState('');
    const [type, setType] = useState('support');
    const [model, setModel] = useState('gpt-4');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            window.location.href = '/dashboard/agents';
        }, 1500);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Link href="/dashboard/agents" passHref legacyBehavior>
                    <Button startIcon={<ArrowBackIcon />} color="inherit" sx={{ mr: 2 }}>
                        Back
                    </Button>
                </Link>
                <Typography variant="h4" fontWeight="bold">
                    Create New Agent
                </Typography>
            </Box>

            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 3 }}>
                {success && <Alert severity="success" sx={{ mb: 3 }}>Agent created successfully (Mock mode)</Alert>}

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Agent Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        fullWidth
                        label="Agent Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="support">Customer Support</MenuItem>
                        <MenuItem value="analytics">Data Analytics</MenuItem>
                        <MenuItem value="automation">Process Automation</MenuItem>
                        <MenuItem value="custom">Custom Role</MenuItem>
                    </TextField>

                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <TextField
                            select
                            fullWidth
                            label="LLM Model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        >
                            <MenuItem value="gpt-4">GPT-4 (Recommended)</MenuItem>
                            <MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem>
                            <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                        </TextField>
                    </Box>

                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <TextField
                            fullWidth
                            label="System Prompt"
                            multiline
                            rows={6}
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            placeholder="You are a helpful customer support agent..."
                            required
                        />
                    </Box>

                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            startIcon={<SaveIcon />}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Creating...' : 'Save Agent'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
