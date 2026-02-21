"use client";

import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TelegramIcon from '@mui/icons-material/Telegram';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyIcon from '@mui/icons-material/Key';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SettingsToggle } from '@/components/SettingsToggle';
import { useSettings } from '@/app/contexts/SettingsContext';

const drawerWidth = 260;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useSettings();

    const handleLogout = () => {
        document.cookie = "test_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/login';
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const mainNavItems = [
        { text: t.common.dashboard, icon: <DashboardIcon />, path: '/dashboard' },
        { text: t.common.agents, icon: <SmartToyIcon />, path: '/dashboard/agents' },
        { text: t.common.teams, icon: <GroupsIcon />, path: '/dashboard/teams' },
        { text: t.common.workflows, icon: <AccountTreeIcon />, path: '/dashboard/workflows' },
    ];

    const toolsNavItems = [
        { text: t.common.telegram, icon: <TelegramIcon />, path: '/dashboard/telegram' },
        { text: t.common.apikeys, icon: <KeyIcon />, path: '/dashboard/apikeys' },
        { text: t.common.logs, icon: <HistoryIcon />, path: '/dashboard/logs' },
    ];

    const bottomNavItems = [
        { text: t.common.billing, icon: <ReceiptIcon />, path: '/dashboard/billing' },
        { text: t.common.settings, icon: <SettingsIcon />, path: '/dashboard/settings' },
    ];

    const renderNavGroup = (items: { text: string; icon: React.ReactNode; path: string }[], label: string) => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary" sx={{ px: 3, fontWeight: 'bold', letterSpacing: 1 }}>
                {label}
            </Typography>
            <List sx={{ px: 2 }}>
                {items.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path + '/'));
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? 'action.selected' : 'transparent',
                                    color: isActive ? 'primary.contrastText' : 'text.primary',
                                    '&:hover': {
                                        bgcolor: isActive ? 'action.selected' : 'action.hover',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
            <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 2, background: 'linear-gradient(45deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                        AI
                    </Box>
                    <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                        GuidePlatform
                    </Typography>
                </Box>
            </Toolbar>

            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {renderNavGroup(mainNavItems, 'Main')}
                {renderNavGroup(toolsNavItems, 'Integrations & Tools')}
            </Box>

            <Box sx={{ p: 2, mt: 'auto' }}>
                {renderNavGroup(bottomNavItems, '')}
                <Divider sx={{ mb: 2 }} />
                <Button
                    fullWidth
                    variant="text"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, borderRadius: 2 }}
                >
                    {t.common.logout}
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: 'text.primary' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <SettingsToggle />
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
