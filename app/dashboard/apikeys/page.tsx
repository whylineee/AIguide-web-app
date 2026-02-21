"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';

export default function ApiKeysPage() {
    const [showKey, setShowKey] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const keys = [
        { id: '1', name: 'Production API Key', key: 'sk-live-xxxxxxxxxxxxxxxxxxa7b', created: 'Oct 12, 2025' },
        { id: '2', name: 'Development Secret', key: 'sk-test-xxxxxxxxxxxxxxxxxxc4d', created: 'Jan 02, 2026' },
    ];

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key);
        setCopied(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="bold">API Keys</Typography>
                <Button variant="contained" color="secondary" startIcon={<AddIcon />}>Generate New Key</Button>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent' }}>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Use these keys to authenticate your external apps, mobile clients, or backend services with the AI Guide Platform.
                    Do not share these keys publicly.
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Secret Key</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {keys.map((k) => (
                                <TableRow key={k.id}>
                                    <TableCell sx={{ fontWeight: 600 }}>{k.name}</TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>
                                        {showKey === k.id ? k.key : 'sk-••••••••••••••••••••••••••••'}
                                        <IconButton size="small" sx={{ ml: 1 }} onClick={() => setShowKey(showKey === k.id ? null : k.id)}>
                                            {showKey === k.id ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{k.created}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => handleCopy(k.key)}>
                                            Copy
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" variant="filled">API Key copied to clipboard!</Alert>
            </Snackbar>
        </Box>
    );
}
