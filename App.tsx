/**
 * @module App.tsx
 *
 * This module defines the main application component for the React Native app.
 * It sets up the contexts providers for authentication and application state,
 * and renders the root component of the application.
 */

import React from 'react';

import Root from './components/root-component';
import { AppProvider } from 'contexts/app-provider';
import { AuthProvider } from 'contexts/auth-provider';

/**
 * The main application component.
 *
 * This component wraps the application with `AuthProvider` and `AppProvider` contexts providers,
 * ensuring that authentication and application state are available throughout the app.
 * It then renders the `Root` component, which contains the main navigation and screens of the app.
 *
 * @function
 * @returns {React.ReactElement} The root element of the application.
 */
export default function App(): React.ReactElement {
    return (
        <AuthProvider>
            <AppProvider>
                <Root />
            </AppProvider>
        </AuthProvider>
    );
}
