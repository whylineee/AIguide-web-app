"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0B0F19', // very dark deep blue/black
            paper: '#111827', // slightly lighter dark blue
        },
        primary: {
            main: '#7C3AED', // vibrant purple
            light: '#A78BFA',
            dark: '#5B21B6',
            contrastText: '#FFF',
        },
        secondary: {
            main: '#10B981', // emerald
            light: '#34D399',
            dark: '#059669',
            contrastText: '#FFF',
        },
        info: {
            main: '#3B82F6', // Blue
        },
        divider: 'rgba(255, 255, 255, 0.08)',
        text: {
            primary: '#F9FAFB',
            secondary: '#9CA3AF',
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em' },
        h3: { fontSize: '1.75rem', fontWeight: 700 },
        h4: { fontSize: '1.5rem', fontWeight: 600 },
        h5: { fontSize: '1.25rem', fontWeight: 600 },
        h6: { fontSize: '1rem', fontWeight: 600 },
        subtitle1: { fontSize: '1rem', fontWeight: 500 },
        body1: { fontSize: '0.95rem' },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.39)', // purple glow
                    },
                },
                outlined: {
                    '&:hover': {
                        boxShadow: '0 4px 14px 0 rgba(255, 255, 255, 0.1)',
                    }
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
                elevation0: {
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(145deg, #111827 0%, #0d1323 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0B0F19',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(11, 15, 25, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 6,
                }
            }
        }
    },
});

export default theme;
