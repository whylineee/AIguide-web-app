"use client";

import React from 'react';
import { Box, Typography, Button, Paper, Grid, Card, CardContent, LinearProgress, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckIcon from '@mui/icons-material/Check';

export default function BillingPage() {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight="bold">Billing & Usage</Typography>
                <Typography color="text.secondary">Manage your subscription, tokens, and billing methods.</Typography>
            </Box>

            <Grid container spacing={4} mb={6}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 4, borderRadius: 4, height: '100%', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
                        <Typography variant="h5" fontWeight="bold" mb={3}>Current Usage (February)</Typography>

                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography fontWeight="600">Premium LLM Tokens (GPT-4)</Typography>
                                <Typography fontWeight="600">45k / 100k</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={45} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography fontWeight="600">Standard Tokens (GPT-3.5)</Typography>
                                <Typography fontWeight="600">120k / unlimited</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={100} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography fontWeight="600">Active Agents</Typography>
                                <Typography fontWeight="600">8 / 10</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={80} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ height: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', color: '#fff', border: 'none' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" fontWeight="bold">Pro Plan</Typography>
                                <AutoAwesomeIcon />
                            </Box>
                            <Typography variant="h3" fontWeight="900" mb={1}>$49<span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/mo</span></Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>Next cycle: Mar 1, 2026</Typography>

                            <Button variant="contained" fullWidth sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f3f4f6' }, mb: 2 }}>
                                Manage Subscription
                            </Button>
                            <Button variant="outlined" fullWidth sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: '#fff' } }}>
                                View Invoices
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Upgrade banner */}
            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RocketLaunchIcon color="warning" /> Need more power?
                    </Typography>
                    <Typography color="text.secondary" mt={1}>
                        Upgrade to Enterprise for unlimited agents, custom SLA, and dedicated support.
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" size="large">Contact Sales</Button>
            </Paper>

        </Box>
    );
}
