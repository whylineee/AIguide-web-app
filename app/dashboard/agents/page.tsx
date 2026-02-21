import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AgentsPage() {
    const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();

    // Mock data until real Supabase is connected
    const agents = [
        { id: '1', name: 'Customer Support Bot', type: 'support', status: 'active', model: 'gpt-4', created_at: new Date().toISOString() },
        { id: '2', name: 'Data Analyzer', type: 'analytics', status: 'offline', model: 'gpt-3.5-turbo', created_at: new Date().toISOString() },
        { id: '3', name: 'Email Assistant', type: 'automation', status: 'active', model: 'gpt-4-turbo', created_at: new Date().toISOString() },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    AI Agents
                </Typography>
                <Link href="/dashboard/agents/new" passHref legacyBehavior>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Create Agent
                    </Button>
                </Link>
            </Box>

            {(!agents || agents.length === 0) ? (
                <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px dashed rgba(255,255,255,0.2)' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No AI Agents found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Create your first intelligent agent to automate your tasks.
                    </Typography>
                    <Link href="/dashboard/agents/new" passHref legacyBehavior>
                        <Button variant="outlined" color="primary">
                            Create First Agent
                        </Button>
                    </Link>
                </Card>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {agents.map((agent) => (
                        <Box key={agent.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 20px -10px rgba(124, 58, 237, 0.4)',
                                }
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Chip
                                            label={agent.status}
                                            color={agent.status === 'active' ? 'success' : 'default'}
                                            size="small"
                                            variant="filled"
                                        />
                                        <Chip
                                            label={String(agent.type).toUpperCase()}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {agent.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Model: {agent.model || 'Default'}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ borderTop: 1, borderColor: 'divider', px: 2, py: 1 }}>
                                    <Link href={`/dashboard/agents/${agent.id}`} passHref legacyBehavior>
                                        <Button size="small" startIcon={<PlayArrowIcon />}>
                                            Test Run
                                        </Button>
                                    </Link>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Link href={`/dashboard/agents/${agent.id}`} passHref legacyBehavior>
                                        <IconButton size="small" title="Settings">
                                            <SettingsIcon fontSize="small" />
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
