// import React, { ReactElement, useState } from 'react';
// import { Text, TextInput, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAuthContext } from '../../context/auth.provider';
//
// import * as Style from '../../assets/styles/index';
// import { flash_message } from '../../assets/utils/animation';
// import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
// import { FunctionVoidType } from '../../types/utils.';
// import { LoginFormButtons } from './LoginFormButtons';
//
// /**
//  * Create new Login form component.
//  *
//  * @constructor
//  */
// export const LoginForm: React.FC = (): ReactElement => {
//     const authContext = useAuthContext();
//     const navigation = useNavigation();
//     const [email, setEmail] = useState<string | null>(null);
//     const [password, setPassword] = useState<string | null>(null);
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
//             if (authResponse === true) {
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
//                 navigation.navigate(NavPath.invoices.InvoicesScreen, {
//                     screen: NavPath.invoices.InvoicesList,
//                     params: {},
//                 });
//             } else {
//                 console.info('1.3. NO GO Navigating...', doNavigateToInvoices);
//             }
//         }
//     };
//
//     const handleSignInUser: FunctionVoidType = (): void => {
//         if (email && password) {
//             void signInUser(email, password);
//         } else {
//             flash_message('warning', 'E-post eller lösenord saknas');
//         }
//     };
//
//     return (
//         <View style={Style.Container.content}>
//             <Text>Email: </Text>
//             <TextInput
//                 style={Style.Form.textInputField}
//                 value={email as string}
//                 onChangeText={setEmail}
//                 textContentType='emailAddress'
//                 keyboardType='email-address'
//                 autoCapitalize='none'
//             />
//
//             <Text>Password: </Text>
//             <TextInput
//                 style={Style.Form.textInputField}
//                 value={password as string}
//                 onChangeText={setPassword}
//                 autoCapitalize='none'
//                 secureTextEntry={true}
//             />
//
//             <LoginFormButtons signInUserCallback={handleSignInUser} />
//         </View>
//     );
// };

import React, { ReactElement, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import * as Style from '../../assets/styles/index';
import { flash_message } from '../../assets/utils/animation';
import { FunctionVoidType } from '../../types/utils-types';
import { useSignInUser } from '../../models/auth-models';
import { LoginFormButtons } from './login-form-buttons';

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const LoginForm: React.FC = (): ReactElement => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { signInUser } = useSignInUser();

    const handleSignInUser: FunctionVoidType = (): void => {
        if (email && password) {
            void signInUser(email, password);
        } else {
            flash_message('warning', 'E-post eller lösenord saknas');
        }
    };

    return (
        <View style={Style.Container.content}>
            <Text>Email: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email as string}
                onChangeText={setEmail}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <Text>Password: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password as string}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <LoginFormButtons signInUserCallback={handleSignInUser} />
        </View>
    );
};
