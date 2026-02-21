"use client"

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkIcon from '@mui/icons-material/Link';

export default function TelegramIntegrationPage() {
    const [botToken, setBotToken] = useState('');

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Telegram Bots
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TelegramIcon />}
                >
                    Connect Bot
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Placeholder for Connected Bots */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                LeadGen Bot
                            </Typography>
                            <Typography color="text.secondary" variant="body2" mb={2}>
                                @LeadGenAwesome_bot
                            </Typography>
                            <Typography variant="body2">
                                Status: <strong>Active Webhook</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Agent Linked: Customer Support Bot
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ borderTop: 1, borderColor: 'divider' }}>
                            <Button size="small" color="error">
                                Disconnect
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Connect New Bot Form */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            New Bot Setup
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Enter your Telegram Bot Token provided by @BotFather to link it to your AI Agents.
                        </Typography>

                        <TextField
                            fullWidth
                            label="Bot Token"
                            variant="outlined"
                            placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                            value={botToken}
                            onChange={(e) => setBotToken(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<LinkIcon />}
                            disabled={!botToken}
                        >
                            Verify & Save
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
