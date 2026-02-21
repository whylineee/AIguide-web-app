"use client";

import React from 'react';
import { ToggleButtonGroup, ToggleButton, Box, IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSettings } from '@/app/contexts/SettingsContext';

export function SettingsToggle() {
    const { mode, setMode, language, setLanguage } = useSettings();

    const handleLanguageChange = (
        event: React.MouseEvent<HTMLElement>,
        newLang: 'en' | 'uk' | null,
    ) => {
        if (newLang !== null) {
            setLanguage(newLang);
        }
    };

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup
                value={language}
                exclusive
                onChange={handleLanguageChange}
                size="small"
                aria-label="text language"
                sx={{ height: 32 }}
            >
                <ToggleButton value="en" aria-label="en">
                    EN
                </ToggleButton>
                <ToggleButton value="uk" aria-label="uk" sx={{ px: 2 }}>
                    UA
                </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} mode`}>
                <IconButton onClick={toggleMode} color="inherit">
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Tooltip>
        </Box>
    );
}
