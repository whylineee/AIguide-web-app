"use client";

import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DashboardHome() {
    const stats = [
        { title: "Total Agents", value: "3", icon: <SmartToyIcon fontSize="large" color="primary" /> },
        { title: "Active Workflows", value: "5", icon: <PlayCircleOutlineIcon fontSize="large" sx={{ color: '#10b981' }} /> },
        { title: "Successful Executions", value: "142", icon: <CheckCircleOutlineIcon fontSize="large" sx={{ color: '#8b5cf6' }} /> },
    ];

    return (
        <Box>
            <Typography variant="h4" mb={4} fontWeight="bold">
                Overview
            </Typography>

            <Grid container spacing={3} mb={5}>
                {stats.map((stat, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'action.hover',
                                    mr: 3,
                                }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" mb={3} fontWeight="bold">
                Recent Activity
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
                <Typography color="text.secondary">
                    Recent workflow executions and agent logs will appear here. No activity recorded yet.
                </Typography>
            </Paper>
        </Box>
    );
}
