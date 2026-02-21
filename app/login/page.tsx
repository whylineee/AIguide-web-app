import React from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';

export default function LoginPage() {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
        }}>
            <Paper elevation={3} sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400,
                borderRadius: 2,
            }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    AI Control Panel
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to your account
                </Typography>

                <form style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
