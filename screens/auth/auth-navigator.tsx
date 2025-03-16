/**
 * @module auth-navigator.tsx
 *
 * This module defines the navigator for the authentication section of the application.
 * It sets up a stack navigator with screens for user login and registration.
 */
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { Login } from './login-screen';
import { Register } from './register-form-screen';
import * as Style from 'assets/styles';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';

/**
 * @constant AuthStack - The stack navigator for the authentication section.
 */
const AuthStack = createStackNavigator();

/**
 * AuthNavigator component.
 *
 * This component sets up a stack navigator for the authentication-related screens.
 * It includes screens for user login and registration.
 *
 * @component
 * @returns {ReactElement} The rendered authentication navigator component.
 */
export const AuthNavigator: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            <AuthStack.Navigator
                id={NavPath.Auth.AuthScreen}
                initialRouteName={NavPath.Auth.Login}>
                <AuthStack.Group navigationKey={NavPath.Auth.AuthScreen}>
                    <AuthStack.Screen
                        key={NavPath.Auth.Login}
                        navigationKey={NavPath.Auth.Login}
                        name={NavPath.Auth.Login}
                        component={Login}
                        options={{
                            title: 'Logga in',
                            headerShown: false,
                        }}
                    />

                    <AuthStack.Screen
                        key={NavPath.Auth.RegisterUser}
                        navigationKey={NavPath.Auth.RegisterUser}
                        name={NavPath.Auth.RegisterUser}
                        component={Register}
                        options={{
                            headerShown: false,
                        }}
                    />
                </AuthStack.Group>
            </AuthStack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
