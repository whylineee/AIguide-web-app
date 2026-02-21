import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                background: {
                    default: '#0B0F19',
                    paper: '#111827',
                },
                primary: {
                    main: '#7C3AED',
                    light: '#A78BFA',
                    dark: '#5B21B6',
                    contrastText: '#FFF',
                },
                secondary: {
                    main: '#10B981',
                    light: '#34D399',
                    dark: '#059669',
                    contrastText: '#FFF',
                },
                info: {
                    main: '#3B82F6',
                },
                divider: 'rgba(255, 255, 255, 0.08)',
                text: {
                    primary: '#F9FAFB',
                    secondary: '#9CA3AF',
                },
            }
            : {
                background: {
                    default: '#F3F4F6',
                    paper: '#FFFFFF',
                },
                primary: {
                    main: '#6D28D9', // Slightly darker purple for light mode
                    light: '#8B5CF6',
                    dark: '#5B21B6',
                    contrastText: '#FFF',
                },
                secondary: {
                    main: '#059669', // Darker emerald for light mode
                    light: '#10B981',
                    dark: '#047857',
                    contrastText: '#FFF',
                },
                info: {
                    main: '#2563EB',
                },
                divider: 'rgba(0, 0, 0, 0.08)',
                text: {
                    primary: '#111827',
                    secondary: '#4B5563',
                },
            }),
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
                root: ({ theme }) => ({
                    borderRadius: 8,
                    padding: '10px 24px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 14px 0 rgba(124, 58, 237, 0.39)'
                            : '0 4px 14px 0 rgba(109, 40, 217, 0.25)',
                    },
                }),
                outlined: ({ theme }) => ({
                    borderColor: theme.palette.divider,
                    '&:hover': {
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 14px 0 rgba(255, 255, 255, 0.1)'
                            : '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
                        borderColor: theme.palette.text.primary,
                    }
                })
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                }),
                elevation0: {
                    boxShadow: 'none !important',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #111827 0%, #0d1323 100%)'
                        : 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
                    backdropFilter: 'blur(10px)',
                })
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    backgroundColor: theme.palette.mode === 'dark' ? '#0B0F19' : '#FFFFFF',
                    borderRight: `1px solid ${theme.palette.divider}`,
                })
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(11, 15, 25, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.primary,
                })
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

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
