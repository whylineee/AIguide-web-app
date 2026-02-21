"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/lib/i18n/en';
import { uk } from '@/lib/i18n/uk';
import { getTheme } from '@/lib/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type Language = 'en' | 'uk';
type ThemeMode = 'light' | 'dark';

interface SettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    t: typeof en;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [mode, setModeState] = useState<ThemeMode>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved settings on mount
        const savedLang = localStorage.getItem('app_language') as Language;
        const savedMode = localStorage.getItem('app_theme') as ThemeMode;
        if (savedLang) setLanguageState(savedLang);
        if (savedMode) setModeState(savedMode);
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
    };

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        localStorage.setItem('app_theme', newMode);
    };

    const t = language === 'en' ? en : uk;
    const theme = getTheme(mode);

    // Prevent flash of incorrect theme before hydration
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <SettingsContext.Provider value={{ language, setLanguage, mode, setMode, t }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
