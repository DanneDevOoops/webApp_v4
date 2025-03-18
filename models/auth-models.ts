/**
 * @module models/auth-models.ts
 *
 * This module provides functions to interact with the authentication-related endpoints of the API.
 * It includes functions to check login status, handle user login, register a new user, and log
 * out the current user. Each function handles API requests and logs any errors that occur
 * during the requests.
 *
 * Functions:
 * - checkLoggedInStatus: Checks if the user is currently logged in.
 * - login: Handles user login.
 * - register: Handles new user registration.
 * - logout: Logs out the current user.
 */

import * as SecureStore from 'expo-secure-store';

import config from 'config/config.json';
import {
    AuthRegisterRequestBody,
    AuthRequestBody,
    AuthResponse,
} from 'interfaces/auth-interfaces';

/**
 * Checks if the user is currently logged in.
 *
 * This function asynchronously retrieves the authentication token from secure storage.
 * If a token exists, it implies the user is logged in, returning true. Otherwise, it returns
 * false.
 *
 * @function checkLoggedInStatus
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the login status.
 */
export async function checkLoggedInStatus(): Promise<boolean> {
    const token: string | null = await SecureStore.getItemAsync('token');
    return token !== null;
}

/**
 * Handles user login.
 *
 * This function sends an asynchronous request to the server's login endpoint with the user's
 * email and password. If the login is successful, it stores the received authentication token
 * in secure storage and returns a success message. Throws an error if the login fails for any
 * reason, including server errors or incorrect login details.
 *
 * @function login
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{title: string, message: string, type: string} | void>} A promise that
 * resolves to an object containing the login response message, or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function login(email: string, password: string) {
    try {
        console.info('3.1. Trigger AuthModel.login() function');
        const data: AuthRequestBody = {
            api_key: config.api_key,
            email,
            password,
        };

        const response: Response = await fetch(
            `${config.base_url}/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                },
            },
        );

        const result: AuthResponse = (await response.json()) as AuthResponse;
        console.log('3.2. AuthResponse: ', result);

        if ('errors' in result) {
            console.info('3.3. AuthResponse result.errors: ', result.errors);
            return {
                // @ts-expect-error  Some sort of type error here...
                title: result.errors.title,
                // @ts-expect-error  Some sort of type error here...
                message: result.errors.detail,
                type: 'danger',
            };
        } else {
            console.info('3.4. AuthResponse result.errors: ', result.errors);
            // @ts-expect-error  Some sort of type error here...
            await SecureStore.setItemAsync('token', result.data.token);

            return {
                title: 'Inloggning',
                message: result.data?.message,
                type: result.data?.type as string,
            };
        }
    } catch (error) {
        console.error('ERROR: ', error);
    }
}

/**
 * Handles new user registration.
 *
 * This function sends an asynchronous request to the server's registration endpoint with the
 * user's email and password. If the registration is successful, it returns the server's
 * response, which typically includes a success message. Throws an error if the registration
 * fails for any reason, such as server errors or validation issues.
 *
 * @function register
 * @param {string} email - The email address for the new account.
 * @param {string} password - The password for the new account.
 * @returns {Promise<AuthResponse | void>} A promise that resolves to the server's response
 * upon successful registration, or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function register(
    email: string,
    password: string,
): Promise<AuthResponse | void> {
    try {
        const data: AuthRegisterRequestBody = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response: Response = await fetch(
            `${config.base_url}/auth/register`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            return Promise.reject(
                new Error(`Server responded with status: ${response.status}`),
            );
        }

        return (await response.json()) as AuthResponse;
    } catch (error) {
        console.log('ERROR: ', error);
        return;
    }
}

/**
 * Logs out the current user.
 *
 * This function removes the authentication token from secure storage, effectively logging the
 * user out. It does not return any value.
 *
 * @function logout
 * @returns {Promise<void>} A promise that resolves when the token is removed from secure storage.
 */
export async function logout(): Promise<void> {
    // Remove token from Expo-SecureStore.
    await SecureStore.deleteItemAsync('token');
}

// export const useSignInUser = () => {
//     const authContext = useAuthContext();
//     const navigation = useNavigation();
//
//     const signInUser = async (
//         email: string,
//         password: string,
//     ): Promise<void> => {
//         console.log('1.1. Trigger sign in User');
//         let doNavigateToInvoices: boolean = false;
//
//         try {
//             const authResponse = await authContext.login(email, password);
//             console.log('1.2. User is signed in?', authResponse);
//             flash_message('success', 'Inloggning lyckades!');
//
//             if (authResponse) {
//                 authContext.setIsLoggedIn(true);
//                 doNavigateToInvoices = true;
//             } else {
//                 authContext.setIsLoggedIn(false);
//             }
//         } catch (e) {
//             console.error('Error in signInUser: ', e);
//             flash_message('danger', 'Inloggning misslyckades!');
//         } finally {
//             if (doNavigateToInvoices) {
//                 console.info('1.3. Navigating to InvoicesList...');
//                 navigation.dispatch(
//                     CommonActions.navigate(NavPath.Invoices.InvoicesScreen, {
//                         screen: NavPath.Invoices.InvoicesList,
//                         params: {},
//                     }),
//                 );
//             } else {
//                 console.info('1.3. NO GO Navigating...', doNavigateToInvoices);
//             }
//         }
//     };
//
//     return { signInUser };
// };
