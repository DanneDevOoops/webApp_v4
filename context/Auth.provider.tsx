/**
 * Provides a React context for authentication, encapsulating the logic for user login, logout, and
 * registration. This context makes user authentication state and functions available
 * throughout the component tree.
 *
 * The `AuthProvider` component wraps the application's component tree to provide every child
 * component access to the authentication context. It maintains the state of the current user,
 * whether the user is logged in, and any authentication-related loading or error states.
 * Functions for login, logout, and registration are provided to manipulate the authentication
 * state.
 *
 * @module AuthProvider
 */
import React, {
    createContext,
    FC,
    ReactElement,
    useContext,
    useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import * as AuthInterfaces from '../interfaces/Auth.interfaces';
import {
    AuthContextType,
    AuthProviderProps,
} from '../interfaces/Auth.interfaces';
import * as AuthModel from '../models/Auth';

/**
 * Authentication context.
 *
 * This context initializes with default values and provides types for the
 * authentication-related state and functions. It includes the current user, login state, and
 * functions for login, logout, and registration.
 *
 * @context
 */
const AuthContext: React.Context<AuthInterfaces.AuthContextType> =
    createContext<AuthContextType>({
        user: undefined,
        setUser(user: AuthInterfaces.User | undefined): void {},
        isLoggedIn: false,
        setIsLoggedIn: (): void => {},
        login: async (email: string, password: string): Promise<void> => {
            await AuthModel.login(email, password);
        },
        logout: async (): Promise<void> => {
            await AuthModel.logout();
        },
        register: async (email: string, password: string): Promise<void> => {
            await AuthModel.register(email, password);
        },
    });

/**
 * Authentication context provider.
 *
 * This component manages the authentication state, including the current user, login status,
 * and any authentication errors. It provides functions to login, logout, and register, which
 * update the authentication state accordingly. Children components can access the
 * authentication state and functions through the `useAuthContext` hook.
 *
 * @param children - The child components that will have access to the authentication
 *      context.
 * @returns {ReactElement} The provider component wrapping its children, providing them access to
 *      the authentication context.
 */
export const AuthProvider: FC<AuthProviderProps> = ({
    children,
}: AuthProviderProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<AuthInterfaces.User | undefined>(
        undefined,
    );
    const [error, setError] = useState<Error | null>(null);

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            // Assuming AuthModel.login() sets some kind of global state or does something else
            // that makes the user "logged in" from the system's perspective.
            await AuthModel.login(email, password).then((user) => {
                console.info('AuthProvider -> login -> user\n', user);

                if (typeof user !== 'undefined') {
                    setUser(user);
                    setIsLoggedIn(true);
                    return true;
                } else {
                    setIsLoggedIn(false);
                    return false;
                }
            });
        } catch (error) {
            setError(error);
        } finally {
            console.log(
                'AuthProvider -> login -> finally -> isLoggedIn?',
                isLoggedIn,
            );
            setIsLoading(false);
        }
    };

    // const checkLoginStatus = async (): Promise<void> => {
    //     const loggedIn = await AuthModel.loggedIn();
    //     setIsLoggedIn(loggedIn);
    // };

    const logout = async (): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync('token');
            setUser(undefined);
            setIsLoggedIn(false);
        } catch (error) {
            setError(error);
        }
    };

    const register = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);

        try {
            await AuthModel.register(email, password);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
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
