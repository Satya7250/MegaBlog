import React from 'react';

// Debug component to check environment variables
export default function Debug() {
    const envVars = {
        VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
        VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
        VITE_APPWRITE_DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        VITE_APPWRITE_BUCKET_ID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    };

    console.log('Environment Variables:', envVars);

    return (
        <div className="fixed top-4 right-4 bg-white p-4 border rounded shadow-lg text-xs z-50">
            <h3 className="font-bold mb-2">Debug Info</h3>
            {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className={`mb-1 ${!value || value === 'undefined' ? 'text-red-600' : 'text-green-600'}`}>
                    <strong>{key}:</strong> {value ? 'SET ✓' : 'MISSING ✗'}
                </div>
            ))}
        </div>
    );
}