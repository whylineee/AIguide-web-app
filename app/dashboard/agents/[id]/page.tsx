"use client"

import React, { useState } from 'react';
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
    Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AgentDetailsPage() {
    const params = useParams();
    const isNew = params.id === 'new';

    const [testInput, setTestInput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    const handleTestRun = async () => {
        setIsTesting(true);
        setTestResult('');
        // Mock simulation wait
        setTimeout(() => {
            setTestResult(`This is a mocked response from the agent for: "${testInput}". In production, this calls /api/agents/${params.id}/execute`);
            setIsTesting(false);
        }, 1500);
    };

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
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => alert('Agent saved!')}>
                    Save Agent
                </Button>
            </Box>

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
                            defaultValue={isNew ? '' : 'Customer Support Bot'}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Agent Type</InputLabel>
                                <Select label="Agent Type" defaultValue="llm">
                                    <MenuItem value="llm">LLM (Text Generation)</MenuItem>
                                    <MenuItem value="telegram">Telegram Bot</MenuItem>
                                    <MenuItem value="automation">Background Automation</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select label="Status" defaultValue="active">
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
                            <Select label="LLM Model" defaultValue="gpt-4o">
                                <MenuItem value="gpt-4o">OpenAI GPT-4o</MenuItem>
                                <MenuItem value="gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography gutterBottom color="text.secondary">
                            Temperature (0.0 - 2.0)
                        </Typography>
                        <Slider
                            defaultValue={0.7}
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
                            defaultValue="You are a helpful customer support assistant. Always respond in a polite and concise manner."
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
                                startIcon={<PlayArrowIcon />}
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
