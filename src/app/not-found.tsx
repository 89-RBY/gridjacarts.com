'use client';

import Error from 'next/error';

export default function NotFound() {
    return (
        <html lang="en">
            <body>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
                    <p style={{ fontSize: '1.5rem', color: '#666' }}>Page Not Found</p>
                </div>
            </body>
        </html>
    );
}
