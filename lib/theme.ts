import { createTheme, alpha } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark') => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#000000',
                    light: '#333333',
                    dark: '#000000',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#7C3AED', // Premium Violet
                    light: '#8B5CF6',
                    dark: '#6D28D9',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#Fcfcfc',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#111827',
                    secondary: '#6B7280',
                },
                divider: 'rgba(0, 0, 0, 0.08)',
                action: {
                    hover: 'rgba(0,0,0,0.04)',
                    selected: 'rgba(0,0,0,0.08)',
                }
            }
            : {
                primary: {
                    main: '#ffffff',
                    light: '#f3f4f6',
                    dark: '#d1d5db',
                    contrastText: '#000000',
                },
                secondary: {
                    main: '#8B5CF6',
                    light: '#A78BFA',
                    dark: '#7C3AED',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#000000', // Pitch Black for extreme premium look
                    paper: '#09090b', // Zinc 950
                },
                text: {
                    primary: '#F9FAFB',
                    secondary: '#9CA3AF',
                },
                divider: 'rgba(255, 255, 255, 0.08)',
                action: {
                    hover: 'rgba(255,255,255,0.05)',
                    selected: 'rgba(255,255,255,0.1)',
                }
            }),
    },
    typography: {
        fontFamily: 'var(--font-geist-sans), Inter, Roboto, sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.025em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.015em' },
        h4: { fontWeight: 700, letterSpacing: '-0.01em' },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 500 },
        subtitle2: { fontWeight: 500 },
        button: { textTransform: 'none' as const, fontWeight: 600 },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    borderRadius: '9999px', // Pill shape
                    padding: '8px 24px',
                    boxShadow: 'none',
                    textTransform: 'none' as const,
                    fontWeight: 600,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 0 20px rgba(255,255,255,0.1)'
                            : '0 4px 14px 0 rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                    }
                }),
                containedPrimary: ({ theme }: any) => ({
                    background: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                    '&:hover': {
                        background: theme.palette.mode === 'dark' ? '#e5e7eb' : '#1f2937',
                    }
                }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 24px 0 rgba(0,0,0,0.5)'
                        : '0 4px 24px 0 rgba(0,0,0,0.04)',
                    backdropFilter: 'blur(12px)',
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(9, 9, 11, 0.7)'
                        : 'rgba(255, 255, 255, 0.8)',
                }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    borderRadius: '24px',
                    backgroundImage: 'none',
                    overflow: 'visible', // for glow effects
                })
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: ({ theme }: any) => ({
                    borderRight: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: '8px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'transparent',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                    },
                    '&.Mui-focused': {
                        background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'transparent',
                        boxShadow: theme.palette.mode === 'dark' ? '0 0 0 2px rgba(255,255,255,0.1)' : '0 0 0 2px rgba(0,0,0,0.1)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                        borderWidth: '1px',
                    }
                })
            }
        }
    },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
