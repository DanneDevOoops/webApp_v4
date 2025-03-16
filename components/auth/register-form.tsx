/**
 * Module imports.
 */
import {
    CommonActions,
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import * as Style from 'assets/styles/index';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAuthContext } from 'contexts/auth-provider';

import type { RootStackParamList } from 'types/navigation-types';

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const RegisterForm: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const authContext = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function registerUser(): void {
        console.log('Click! -> Registrera ny användare med...');

        console.log('Input Email -> ', email);
        console.log('Input Password -> ', password);
        console.log('Input ConfirmedPassword -> ', passwordConfirm);

        // Register user.
        if (password === passwordConfirm) {
            // Register user in API.
            void authContext.register(email, password);
            console.log('User registered!');

            // Login user in API.
            void authContext.login(email, password);
            console.log('User logged in!');

            // TODO: Change this to be more secure and only navigate if the user is registered
            //  and logged in successfully with a API token. This will fix issue #9
            // Navigate to invoice screen.
            navigation.dispatch(
                CommonActions.navigate(NavPath.Invoices.InvoicesScreen, {
                    screen: NavPath.Invoices.InvoicesList,
                }),
            );
        } else {
            console.log('Passwords do not match!');
        }
    }

    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>Användarregistrering</Text>

            <Text>Email: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />

            <Text>Lösenord: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <Text>Bekräfta Lösenordet: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <View
                style={[
                    Style.Container.gridRowNoPadding,
                    {
                        marginTop: Style.Typography.whiteSpace[100],
                    },
                ]}>
                <Pressable
                    style={({ pressed }) => [
                        Style.Button.buttonContainer,
                        { opacity: pressed ? 0.5 : 1 },
                    ]}
                    onPress={registerUser}>
                    <Text style={Style.Typography.buttonText}>
                        Registrera ny användare
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        Style.Button.buttonContainer,
                        { opacity: pressed ? 0.5 : 1 },
                    ]}
                    onPress={(): void => {
                        navigation.dispatch(
                            CommonActions.navigate(NavPath.Auth.AuthScreen, {
                                screen: NavPath.Auth.Login,
                            }),
                        );
                    }}>
                    <Text style={Style.Typography.buttonText}>
                        Gå till Login
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
