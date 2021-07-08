import React from 'react';
import { AuthProvider } from './AuthProvider';
import { BadgeProvider } from './BadgeProvider';
import Routes from './Routes';

export default function Providers() {
    
    return (
        <AuthProvider>
            <BadgeProvider>
                <Routes />
            </BadgeProvider>
        </AuthProvider>
    )
}


