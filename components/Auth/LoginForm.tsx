import React, { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/Auth.provider';
import * as AuthModel from '../../models/Auth';
import * as Style from '../../assets/styles/index';
import { flash_message } from '../../assets/utils/animation';

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const LoginForm: React.FC = (): React.ReactElement => {
    const authContext = useAuthContext();
    const navigation = useNavigation();
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    useLoginEffect(authContext);

    const loginUser = async () => {
        await handleLogin(email, password, navigation);
    };

    return (
        <View style={Style.Container.content}>
            <Text>Email: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email}
                onChangeText={setEmail}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <Text>Password: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <FormButtons
                loginUser={loginUser}
                navigation={navigation}
            />
        </View>
    );
};

const useLoginEffect = (authContext: any): void => {
    useEffect((): void => {
        if (authContext.isLoggedIn) {
            flash_message('info', 'Användaren är inloggad');
        } else {
            flash_message('info', 'Användaren är inte inloggad');
        }
    }, [authContext.isLoggedIn]);
};

const handleLogin = async (
    email: string | null,
    password: string | null,
    navigation: any,
) => {
    if (email && password) {
        try {
            const result = await AuthModel.login(email, password);

            if (result?.type === 'success') {
                flash_message('success', 'Inloggning lyckades!');
                navigation.navigate('Fakturor', { screen: 'Fakturalista' });
            } else {
                flash_message('danger', 'Inloggning misslyckades!');
            }
        } catch (error) {
            flash_message('danger', 'Fel uppstod vin inloggning');
            console.error('loginUser() -> Error during login:', error);
        }
    } else {
        flash_message('warning', 'E-post eller lösenord saknas');
    }
};

const FormButtons: React.FC<{ loginUser: () => void; navigation: any }> = ({
    loginUser,
    navigation,
}) => (
    <View
        style={[
            Style.Container.grid.rowNoPadding as ViewStyle,
            {
                marginTop: Style.Typography.whiteSpace[100],
            } as ViewStyle,
        ]}>
        <Pressable
            style={({ pressed }) => [
                Style.Button.buttonContainer,
                { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={loginUser}>
            <Text style={Style.Typography.buttonText}>Logga in</Text>
        </Pressable>

        <Text>
            Om ni inte har en användare kan ni
            <Pressable
                onPress={(): void => {
                    navigation.navigate('Registrera användare');
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                <Text style={{ color: 'blue' }}>
                    registrera en ny användare här.
                </Text>
            </Pressable>
        </Text>
    </View>
);
