/**
 * @module hooks/auth-hooks.ts
 *
 * @description
 * This module provides custom hooks for handling authentication-related functionality
 * within the application. It includes a hook for signing in a user using their email
 * and password, and handles navigation to the invoices list screen upon successful login.
 *
 * @remarks
 * The hooks in this module utilize the authentication context to perform login operations
 * and manage user authentication state. They also handle navigation actions based on the
 * authentication status.
 *
 * @example
 * // Import the hook
 * import { useSignInUser } from 'hooks/auth-hooks';
 *
 * // Use the hook in a component
 * const { signInUser } = useSignInUser();
 * signInUser('user@example.com', 'password123');
 *
 * @exports
 * - useSignInUser: A custom hook to handle user sign-in functionality.
 */

import { CommonActions, useNavigation } from '@react-navigation/native';

import { flash_message } from 'assets/utils/animation';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAuthContext } from 'contexts/auth-provider';

/**
 * Custom hook to handle user sign-in functionality.
 *
 * @module hooks/auth-hooks.ts
 *
 * @remarks
 * This hook provides a function to sign in a user using their email and password.
 * It utilizes the authentication context to perform the login operation and navigates
 * to the invoices list screen upon successful login.
 *
 * @returns {Object} An object containing the `signInUser` function.
 *
 * @function useSignInUser
 * @returns {Object} An object containing the `signInUser` function.
 *
 * @example
 * const { signInUser } = useSignInUser();
 * signInUser('user@example.com', 'password123');
 */
export const useSignInUser = () => {
    const authContext = useAuthContext();
    const navigation = useNavigation();

    const signInUser = async (
        email: string,
        password: string,
    ): Promise<void> => {
        console.log('1.1. Trigger sign in User');
        let doNavigateToInvoices: boolean = false;

        try {
            const authResponse: boolean = await authContext.login(
                email,
                password,
            );
            console.log('1.2. User is signed in?', authResponse);

            if (authResponse) {
                authContext.setIsLoggedIn(true);
                doNavigateToInvoices = true;
                flash_message('success', 'Inloggning lyckades!');
            } else {
                authContext.setIsLoggedIn(false);
                flash_message('danger', 'Inloggning misslyckades!');
            }
        } catch (e) {
            console.error('Error in signInUser: ', e);
            flash_message('danger', 'Inloggning misslyckades!');
        } finally {
            if (doNavigateToInvoices) {
                console.info('1.3. Navigating to InvoicesList...');
                navigation.dispatch(
                    CommonActions.navigate(NavPath.Invoices.InvoicesScreen, {
                        screen: NavPath.Invoices.InvoicesList,
                        params: {},
                    }),
                );
            } else {
                console.info('1.3. NO GO Navigating...', doNavigateToInvoices);
            }
        }
    };

    return { signInUser };
};
