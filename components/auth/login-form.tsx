import React, { ReactElement, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { LoginFormButtons } from './login-form-buttons';
import * as Style from 'assets/styles/index';
import { flash_message } from 'assets/utils/animation';
import { useSignInUser } from 'hooks/auth-hooks';
import { FunctionVoidType } from 'types/utils-types';

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
