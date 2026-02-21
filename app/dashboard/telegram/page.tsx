"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert, Switch, FormControlLabel, CircularProgress, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TelegramIcon from '@mui/icons-material/Telegram';
import { createClient } from '@/lib/supabase/client';

export default function TelegramIntegrationPage() {
    const supabase = createClient();

    const [botId, setBotId] = useState<string | null>(null);
    const [botToken, setBotToken] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('none');
    const [autoReply, setAutoReply] = useState(false);

    const [agents, setAgents] = useState<any[]>([]);
    const [webhookUrl, setWebhookUrl] = useState('');

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setWebhookUrl(`${window.location.origin}/api/telegram/webhook`);
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            // Load agents for the dropdown
            const { data: agentsData } = await supabase.from('agents').select('*');
            if (agentsData) setAgents(agentsData);

            // Load bot config if it exists
            const { data: botData } = await supabase
                .from('telegram_bots')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (botData) {
                setBotId(botData.id);
                setBotToken(botData.bot_token);
                setSelectedAgent(botData.agent_id || 'none');
                setAutoReply(botData.status === 'active');
            }
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setErrorMsg('');

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) throw new Error("Not authenticated");

            const payload = {
                user_id: session.user.id,
                bot_token: botToken,
                agent_id: selectedAgent === 'none' ? null : selectedAgent,
                status: autoReply ? 'active' : 'paused'
            };

            if (botId) {
                // Update
                const { error } = await supabase.from('telegram_bots').update(payload).eq('id', botId);
                if (error) throw error;
            } else {
                // Insert
                const { data, error } = await supabase.from('telegram_bots').insert(payload).select().single();
                if (error) throw error;
                if (data) setBotId(data.id);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to save configuration");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

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
                {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

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
                        helperText="Provide this URL to Telegram so they can push events to your app"
                        disabled // System generated usually
                    />

                    <TextField
                        select
                        fullWidth
                        label="Default Routing Agent"
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        helperText="Select the AI agent that will process incoming Telegram messages"
                    >
                        <MenuItem value="none">None (Ignore Messages)</MenuItem>
                        {agents.map(a => (
                            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel
                        control={<Switch checked={autoReply} onChange={(e) => setAutoReply(e.target.checked)} color="primary" />}
                        label="Enable Bot Integration"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                        onClick={handleSave}
                        disabled={isSaving || !botToken}
                        sx={{ mt: 2, justifySelf: 'start' }}
                    >
                        {isSaving ? 'Saving...' : 'Save Configuration'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
