"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Grid, TextField, Divider, Alert, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const handleOAuthLogin = async (provider: 'google' | 'linkedin_oidc' | 'github') => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            window.location.href = '/dashboard';
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh', bgcolor: 'background.default' }}>
            {/* Left side styling / Graphics */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    p: 6,
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '-20%', left: '-10%',
                    width: '100%', height: '100%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    pointerEvents: 'none'
                }} />
                <Box sx={{ textAlign: 'center', color: '#fff', zIndex: 1, maxWidth: 600 }}>
                    <Typography variant="h2" fontWeight="800" gutterBottom sx={{ textShadow: '0px 4px 12px rgba(0,0,0,0.2)' }}>
                        Build AI Agents. Automate Workflows.
                    </Typography>
                    <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.9 }}>
                        The ultimate premium SaaS control panel designed for managing everything seamlessly with Supabase & Next.js.
                    </Typography>
                </Box>
            </Grid>

            {/* Right side form */}
            <Grid item xs={12} sm={8} md={5} component={Box} sx={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', p: 4
            }}>
                <Paper elevation={0} sx={{
                    p: { xs: 4, sm: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 450,
                    background: 'transparent',
                    border: 'none',
                }}>
                    <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                        Sign in to access your Agent Dashboard
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 3 }}>{error}</Alert>}

                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                        onClick={() => handleOAuthLogin('google')}
                        disabled={loading}
                        sx={{ mb: 2, justifyContent: 'flex-start', px: 3, py: 1.5, borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<LinkedInIcon sx={{ color: '#0077b5' }} />}
                        onClick={() => handleOAuthLogin('linkedin_oidc')}
                        disabled={loading}
                        sx={{ mb: 2, justifyContent: 'flex-start', px: 3, py: 1.5, borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
                    >
                        Continue with LinkedIn
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<GitHubIcon />}
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading}
                        sx={{ mb: 3, justifyContent: 'flex-start', px: 3, py: 1.5, borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
                    >
                        Continue with GitHub
                    </Button>

                    <Divider sx={{ width: '100%', mb: 3, typography: 'body2', color: 'text.secondary' }}>OR</Divider>

                    <Box component="form" onSubmit={handleEmailLogin} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ mt: 4, mb: 2, py: 1.5, background: 'linear-gradient(45deg, #7C3AED 30%, #5B21B6 90%)', border: 0 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In & Start Building'}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
