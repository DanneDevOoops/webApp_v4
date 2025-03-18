/**
 * @module hooks/auth-hooks.ts
 */
import { CommonActions, useNavigation } from '@react-navigation/native';

import { flash_message } from 'assets/utils/animation';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAuthContext } from 'contexts/auth-provider';

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
            const authResponse = await authContext.login(email, password);
            console.log('1.2. User is signed in?', authResponse);
            flash_message('success', 'Inloggning lyckades!');

            if (authResponse) {
                authContext.setIsLoggedIn(true);
                doNavigateToInvoices = true;
            } else {
                authContext.setIsLoggedIn(false);
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
