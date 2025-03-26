/**
 * @module components/auth/login-form-buttons.tsx
 *
 * This module defines the buttons for the login form.
 * It includes a button for logging in and a link for navigating to the registration screen.
 */

import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import {
    Pressable,
    PressableStateCallbackType,
    Text,
    View,
} from 'react-native';

import * as Style from 'assets/styles';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { FunctionVoidType } from 'types/utils-types';

/**
 * LoginFormButtons component.
 *
 * This component renders the buttons for the login form. It includes a button for logging in
 * and a link for navigating to the registration screen.
 *
 * @function
 * @param {Object} props - The properties for the LoginFormButtons component.
 * @param {FunctionVoidType} props.signInUserCallback - The callback function to be called  when
 * the login button is pressed.
 * @returns {ReactElement} The rendered LoginFormButtons component.
 */
export const LoginFormButtons: React.FC<{
    signInUserCallback: FunctionVoidType;
}> = ({ signInUserCallback }): ReactElement => {
    const navigation = useNavigation();

    return (
        <View
            style={[
                Style.Container.gridRowNoPadding,
                {
                    marginTop: Style.Typography.whiteSpace[100],
                },
            ]}>
            <Pressable
                style={({ pressed }: PressableStateCallbackType) => [
                    Style.Button.buttonContainer,
                    { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={signInUserCallback}>
                <Text style={Style.Typography.buttonText}>Logga in</Text>
            </Pressable>

            <Text>
                Om ni inte har en användare kan ni
                <Pressable
                    onPress={(): void => {
                        navigation.dispatch(
                            CommonActions.navigate(NavPath.Auth.AuthScreen, {
                                screen: NavPath.Auth.RegisterUser,
                            }),
                        );
                    }}
                    style={({
                        pressed,
                    }: PressableStateCallbackType): { opacity: number }[] => [
                        { opacity: pressed ? 0.5 : 1 },
                    ]}>
                    <Text style={{ color: 'blue' }}>
                        registrera en ny användare här.
                    </Text>
                </Pressable>
            </Text>
        </View>
    );
};
