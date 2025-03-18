/**
 * @module components/auth/login-form.tsx
 *
 * This module defines the form component for user login.
 * It handles user input for email and password, and manages the login process.
 */

import React, { ReactElement, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { LoginFormButtons } from './login-form-buttons';
import * as Style from 'assets/styles/index';
import { flash_message } from 'assets/utils/animation';
import { useSignInUser } from 'hooks/auth-hooks';
import { FunctionVoidType } from 'types/utils-types';

/**
 * LoginForm component.
 *
 * This component renders a form for user login. It handles user input for email
 * and password, and manages the login process.
 *
 * @function
 * @returns {ReactElement} The rendered LoginForm component.
 */
export const LoginForm: React.FC = (): ReactElement => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { signInUser } = useSignInUser();

    /**
     * Handles the user sign-in process.
     *
     * This function validates the input and calls the signInUser function
     * from the auth hooks.
     *
     * @function handleSignInUser
     * @returns {void}
     */
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
