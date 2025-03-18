/**
 * @module interfaces/auth-interfaces.ts
 *
 * This module defines a cohesive set of TypeScript interfaces that outline the structure and
 * types of data involved in authentication processes within the application. It includes
 * interfaces for user credentials, request bodies for registration and login, responses from
 * authentication requests, and the contexts for managing authentication state and operations.
 */

import { ReactNode } from 'react';

/**
 * Represents a user with credentials.
 *
 * This interface is used for operations that require user identification, such as logging in.
 *
 * @interface User
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the user account.
 */
export interface User {
    email: string;
    password: string;
}

/**
 * Defines the structure for the request body to register a new user.
 *
 * This interface is used when sending data to the server to create a new user account.
 *
 * @interface AuthRegisterRequestBody
 * @property {string} api_key - The API key required for authentication to the server.
 * @property {string} email - The email address of the new user.
 * @property {string} password - The password for the new user account.
 */
export interface AuthRegisterRequestBody {
    api_key: string;
    email: string;
    password: string;
}

/**
 * Defines the structure for the request body for authentication.
 *
 * This interface is used when sending login credentials to the server.
 *
 * @interface AuthRequestBody
 * @property {string} api_key - The API key required for authentication to the server.
 * @property {string} email - The email address of the user attempting to log in.
 * @property {string} password - The password of the user attempting to log in.
 */
export interface AuthRequestBody {
    api_key: string;
    email: string;
    password: string;
}

/**
 * Represents the response from an authentication request.
 *
 * This interface defines the structure of the response data received after an authentication
 * request.
 *
 * @interface AuthResponse
 * @property {Object} [data] - The data object containing authentication details.
 * @property {string} data.title - The title of the response.
 * @property {string} data.message - The message of the response.
 * @property {string} data.type - The type of the response.
 * @property {string} data.token - The authentication token.
 * @property {Object} data.user - The user object containing user details.
 * @property {string} data.user.api_key - The API key of the user.
 * @property {string} data.user.email - The email address of the user.
 * @property {Object} [errors] - The errors object containing error details.
 * @property {string} errors.title - The title of the error.
 * @property {string} errors.detail - The detail of the error.
 */
export interface AuthResponse {
    data?: {
        title: string;
        message: string;
        type: string;
        token: string;
        user: {
            api_key: string;
            email: string;
        };
    };
    errors?: {
        title: string;
        detail: string;
    };
}

/**
 * Represents the structure of an authentication response object.
 *
 * This interface defines the structure of the response object received after an authentication
 * request.
 *
 * @interface AuthResponseObject
 * @property {string} title - The title of the response.
 * @property {string} message - The message of the response.
 * @property {string} type - The type of the response.
 */
export interface AuthResponseObject {
    title: string;
    message: string;
    type: string;
}

/**
 * Defines the contexts for authentication operations within the application.
 *
 * This interface provides the structure for the authentication contexts, which manages user
 * state and authentication operations such as login, logout, and registration.
 *
 * @interface AuthContextType
 * @property {User | undefined} user - The current user object or undefined if no user is
 * logged in.
 * @property {(user: User) => void} setUser - Function to update the current user state.
 * @property {boolean} isLoggedIn - Boolean indicating if a user is currently logged in.
 * @property {(authIndicator: boolean) => void} setIsLoggedIn - Function to update the login state.
 * @property {(username: string, password: string) => Promise<void>} login - Async function to
 * handle user login.
 * @property {() => Promise<void>} logout - Async function to handle user logout.
 * @property {(username: string, password: string) => Promise<void>} register - Async function
 * to handle user registration.
 */
export interface AuthContextType {
    user?: User | undefined;
    setUser?: (user: User) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (authIndicator: boolean) => void;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
}

/**
 * Authentication provider properties.
 *
 * This interface defines the properties that the `AuthProvider` component accepts.
 *
 * @interface AuthProviderProps
 * @property {ReactNode} children - The child components that will have access to the
 * authentication contexts.
 */
export interface AuthProviderProps {
    children: ReactNode;
}
