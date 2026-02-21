"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function SettingsPage() {
    const [name, setName] = useState('Marko');
    const [company, setCompany] = useState('AI Innovations');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Profile Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your account details and preferences.
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
                {saved && <Alert severity="success" sx={{ mb: 3 }}>Settings updated successfully!</Alert>}

                <Box component="form" sx={{ display: 'grid', gap: 3 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Company Name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="Email Address"
                        value="marko@example.com"
                        disabled
                        helperText="Email address cannot be changed right now."
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{ mt: 2, justifySelf: 'start' }}
                    >
                        Save Profile
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
