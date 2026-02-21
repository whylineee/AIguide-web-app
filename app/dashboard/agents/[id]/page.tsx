"use client"

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Slider,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AgentDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const isNew = params.id === 'new';
    const supabase = createClient();

    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Agent State
    const [name, setName] = useState('');
    const [type, setType] = useState('llm');
    const [status, setStatus] = useState('active');
    const [model, setModel] = useState('gpt-3.5-turbo');
    const [temperature, setTemperature] = useState(0.7);
    const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');

    // Test Console State
    const [testInput, setTestInput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        if (!isNew && params.id) {
            fetchAgent();
        }
    }, [isNew, params.id]);

    const fetchAgent = async () => {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('id', params.id)
            .single();

        if (data) {
            setName(data.name || '');
            setType(data.type || 'llm');
            setStatus(data.status || 'active');
            setModel(data.model || 'gpt-3.5-turbo');
            setTemperature(data.temperature || 0.7);
            setSystemPrompt(data.system_prompt || '');
        } else if (error) {
            console.error('Failed to load agent:', error);
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const agentData = {
                user_id: user.id,
                name,
                type,
                status,
                model,
                temperature,
                system_prompt: systemPrompt,
                updated_at: new Date().toISOString()
            };

            if (isNew) {
                const { data, error } = await supabase
                    .from('agents')
                    .insert(agentData)
                    .select()
                    .single();
                if (error) throw error;
                setSaveStatus({ type: 'success', message: 'Agent created successfully!' });
                setTimeout(() => router.push(`/dashboard/agents/${data.id}`), 1000);
            } else {
                const { error } = await supabase
                    .from('agents')
                    .update(agentData)
                    .eq('id', params.id);
                if (error) throw error;
                setSaveStatus({ type: 'success', message: 'Agent updated successfully!' });
            }
        } catch (err: any) {
            setSaveStatus({ type: 'error', message: err.message || 'Failed to save agent' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleTestRun = async () => {
        setIsTesting(true);
        setTestResult('');

        try {
            // Call the correct API endpoint
            const res = await fetch(`/api/agents/${params.id}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: testInput })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Test failed');
            setTestResult(data.result || 'No response from agent.');
        } catch (err: any) {
            setTestResult(`Error: ${err.message}`);
        } finally {
            setIsTesting(false);
        }
    };

    if (isLoading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    href="/dashboard/agents"
                    color="inherit"
                >
                    Back
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    {isNew ? 'Create New Agent' : 'Agent Configuration'}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving || !name}
                >
                    {isSaving ? 'Saving...' : 'Save Agent'}
                </Button>
            </Box>

            {saveStatus && (
                <Alert severity={saveStatus.type} sx={{ mb: 4 }}>
                    {saveStatus.message}
                </Alert>
            )}

            <Grid container spacing={4}>
                {/* Left column: Configuration */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            General Settings
                        </Typography>

                        <TextField
                            fullWidth
                            label="Agent Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 3 }}
                            required
                        />

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Agent Type</InputLabel>
                                <Select label="Agent Type" value={type} onChange={(e) => setType(e.target.value)}>
                                    <MenuItem value="llm">LLM (Text Generation)</MenuItem>
                                    <MenuItem value="telegram">Telegram Bot</MenuItem>
                                    <MenuItem value="automation">Background Automation</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="paused">Paused</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" fontWeight="bold" mb={3}>
                            Model Configuration
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel>LLM Model</InputLabel>
                            <Select label="LLM Model" value={model} onChange={(e) => setModel(e.target.value)}>
                                <MenuItem value="gpt-4o">OpenAI GPT-4o</MenuItem>
                                <MenuItem value="gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography gutterBottom color="text.secondary">
                            Temperature (0.0 - 2.0): {temperature}
                        </Typography>
                        <Slider
                            value={temperature}
                            onChange={(_, value) => setTemperature(value as number)}
                            step={0.1}
                            marks
                            min={0}
                            max={2}
                            valueLabelDisplay="auto"
                            sx={{ mb: 4 }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="System Prompt"
                            placeholder="You are a helpful customer support assistant..."
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                        />
                    </Paper>
                </Grid>

                {/* Right column: Test Console */}
                {!isNew && (
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Paper sx={{ p: 4, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" fontWeight="bold" mb={3}>
                                Test Console
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="User Input"
                                placeholder="Message the agent..."
                                value={testInput}
                                onChange={(e) => setTestInput(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={isTesting ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                                onClick={handleTestRun}
                                disabled={!testInput || isTesting}
                                sx={{ mb: 4 }}
                            >
                                {isTesting ? 'Running...' : 'Run Test'}
                            </Button>

                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Agent Response:
                            </Typography>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    flexGrow: 1,
                                    bgcolor: 'background.default',
                                    minHeight: 150,
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {testResult || <Typography color="text.disabled" fontStyle="italic">Output will appear here...</Typography>}
                            </Paper>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
