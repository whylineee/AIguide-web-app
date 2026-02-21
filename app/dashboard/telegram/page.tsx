"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert, Switch, FormControlLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TelegramIcon from '@mui/icons-material/Telegram';

export default function TelegramIntegrationPage() {
    const [botToken, setBotToken] = useState('1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const [webhookUrl, setWebhookUrl] = useState('https://yoursite.vercel.app/api/telegram/webhook');
    const [autoReply, setAutoReply] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <TelegramIcon sx={{ fontSize: 40, mr: 2, color: '#0088cc' }} />
                <Typography variant="h4" fontWeight="bold">
                    Telegram Integration
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Bot Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Connect your Telegram bot to automatically route messages to your AI agents or trigger workflows.
                </Typography>

                {saved && <Alert severity="success" sx={{ mb: 3 }}>Settings saved successfully!</Alert>}

                <Box component="form" sx={{ display: 'grid', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Telegram Bot Token"
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        helperText="Get this from @BotFather on Telegram"
                    />

                    <TextField
                        fullWidth
                        label="Webhook URL"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        helperText="Provide this URL to Telegram so they can push events to your app"
                        disabled // System generated usually
                    />

                    <FormControlLabel
                        control={<Switch checked={autoReply} onChange={(e) => setAutoReply(e.target.checked)} color="primary" />}
                        label="Auto-reply to all messages using Default Agent"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{ mt: 2, justifySelf: 'start' }}
                    >
                        Save Configuration
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
