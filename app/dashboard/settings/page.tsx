"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert, Grid, Switch, FormControlLabel, Divider, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PaletteIcon from '@mui/icons-material/Palette';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSettings } from '@/app/contexts/SettingsContext';

export default function SettingsPage() {
    const { t } = useSettings();
    const [name, setName] = useState('Marko');
    const [company, setCompany] = useState('AI Innovations');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dashboard Customization State
    const [showActivityLog, setShowActivityLog] = useState(true);
    const [showCharts, setShowCharts] = useState(true);
    const [compactMode, setCompactMode] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Settings & Preferences
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your account details and fully customize your dashboard experience.
                </Typography>
            </Box>

            {saved && <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>All settings updated successfully! Customizations have been applied.</Alert>}

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                        <Typography variant="h5" fontWeight="bold" mb={3}>Profile Information</Typography>

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
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                            <PaletteIcon color="secondary" />
                            <Typography variant="h5" fontWeight="bold">Dashboard UI</Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Customize which modules are displayed on your main overview page.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                                <FormControlLabel
                                    control={<Switch checked={showCharts} onChange={(e) => setShowCharts(e.target.checked)} color="secondary" />}
                                    label={<Typography fontWeight="500">Enable Analytics Charts</Typography>}
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Paper>
                            <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                                <FormControlLabel
                                    control={<Switch checked={showActivityLog} onChange={(e) => setShowActivityLog(e.target.checked)} color="secondary" />}
                                    label={<Typography fontWeight="500">Show Recent Activity Feed</Typography>}
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Paper>
                            <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                                <FormControlLabel
                                    control={<Switch checked={compactMode} onChange={(e) => setCompactMode(e.target.checked)} color="secondary" />}
                                    label={<Typography fontWeight="500">Compact View Mode</Typography>}
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Paper>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Accordion sx={{ borderRadius: 4, '&:before': { display: 'none' }, bgcolor: 'transparent', border: '1px solid rgba(255,0,0,0.3)' }} defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 4, py: 2 }}>
                            <Typography variant="h6" color="error" fontWeight="bold">Danger Zone</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 4, pb: 4 }}>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Deleting your account will permanently remove all agents, teams, and execution data. This cannot be undone.
                            </Typography>
                            <Button variant="outlined" color="error">
                                Permanently Delete Account
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            {/* Sticky Save Bar */}
            <Box sx={{
                position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
                bgcolor: 'background.paper', p: 2, borderRadius: 10, boxShadow: '0px 10px 40px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', gap: 3, border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 100
            }}>
                <Typography variant="body2" fontWeight="500" sx={{ opacity: 0.8, display: { xs: 'none', sm: 'block' } }}>
                    Unsaved changes
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{ px: 4 }}
                >
                    Save All Settings
                </Button>
            </Box>
        </Box>
    );
}
