/**
 * @module contexts/auth-provider.tsx
 *
 * This module provides a React context for authentication, encapsulating the logic for user
 * login, logout, and registration. It makes user authentication state and functions available
 * throughout the component tree.
 */

import * as SecureStore from 'expo-secure-store';
import React, {
    ReactElement,
    createContext,
    useContext,
    useState,
} from 'react';

import { AuthContextType, AuthProviderProps } from 'interfaces/auth-interfaces';
import * as AuthModel from 'models/auth-models';

/**
 * Authentication contexts.
 *
 * This contexts initializes with default values and provides types for the
 * authentication-related state and functions. It includes the current user, login state, and
 * functions for login, logout, and registration.
 *
 * @contexts
 */
const AuthContext: React.Context<AuthContextType> =
    createContext<AuthContextType>({
        isLoggedIn: false,
        setIsLoggedIn: (value: boolean): boolean => {
            return value;
        },
        login: async (email: string, password: string) => {
            return !!(await AuthModel.login(email, password));
        },
        logout: async (): Promise<void> => {
            await AuthModel.logout();
        },
        register: async (email: string, password: string) => {
            await AuthModel.register(email, password);
        },
    });

/**
 * AuthProvider component.
 *
 * This component manages the authentication state, including the current user, login status,
 * and any authentication errors. It provides functions to login, logout, and register, which
 * update the authentication state accordingly. Children components can access the
 * authentication state and functions through the `useAuthContext` hook.
 *
 * @function
 * @param {AuthProviderProps} props - The properties for the AuthProvider component.
 * @returns {ReactElement} The provider component wrapping its children, providing them access
 * to the authentication context.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
}: AuthProviderProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = async (email: string, password: string): Promise<boolean> => {
        if (isLoading !== true) {
            setIsLoggedIn(true);
        }

        try {
            const authResponse:
                | {
                      title: string;
                      message: string | undefined;
                      type: string;
                  }
                | undefined = await AuthModel.login(email, password);

            if (authResponse && authResponse.type === 'success') {
                setIsLoggedIn(true);
                return true;
            } else {
                setIsLoggedIn(false);
                return false;
            }
        } catch (error) {
            console.error('AuthProvider -> login -> error\n', error);
        } finally {
            setIsLoading(false);
        }

        return false;
    };

    const logout = async (): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync('token').then((): void => {
                setIsLoggedIn(false);
            });
        } catch (error) {
            console.error('AuthProvider -> logout -> error\n', error);
        }

        return;
    };

    const register = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);

        try {
            await AuthModel.register(email, password);
        } catch (error) {
            console.error('AuthProvider -> register -> error\n', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                login,
                logout,
                register,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * useAuthContext hook.
 *
 * A custom hook that provides access to the authentication context.
 * Components using this hook can access the current user, authentication state, and functions
 * for login, logout, and registration.
 *
 * @returns {AuthContextType} The authentication context, including the current user,
 * authentication state, and related functions.
 */
export const useAuthContext: () => AuthContextType = (): AuthContextType =>
    useContext(AuthContext);
