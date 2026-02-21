import React from 'react';
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
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AgentsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: agents } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

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
                    component={Link}
                    href="/dashboard/agents/new"
                >
                    Create Agent
                </Button>
            </Box>

            {(!agents || agents.length === 0) ? (
                <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px dashed rgba(255,255,255,0.2)' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No AI Agents found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Create your first intelligent agent to automate your tasks.
                    </Typography>
                    <Button component={Link} href="/dashboard/agents/new" variant="outlined" color="primary">
                        Create First Agent
                    </Button>
                </Card>
            ) : (
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
                                    <Button size="small" startIcon={<PlayArrowIcon />} component={Link} href={`/dashboard/agents/${agent.id}`}>
                                        Test Run
                                    </Button>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton size="small" title="Settings" component={Link} href={`/dashboard/agents/${agent.id}`}>
                                        <SettingsIcon fontSize="small" />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
