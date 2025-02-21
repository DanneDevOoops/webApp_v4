/**
 * @module AuthNavigator
 *
 * This module defines the authentication navigator for the application.
 * It includes screens for user login and registration.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @requires react
 * @requires react-native
 * @requires @react-navigation/stack
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../assets/styles
 * @requires ./Login.screen
 * @requires ./Register.screen
 * @requires ../../constants/Navigation
 */
import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import { Login } from './Login.screen';
import { Register } from './Register.screen';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import * as Style from '../../assets/styles';
import { StatusBar } from 'expo-status-bar';


/**
 * Stack navigator for authentication.
 */
const AuthStack = createStackNavigator();


/**
 * AuthNavigator component.
 *
 * This component sets up a stack navigator for the authentication-related screens.
 * It includes the following screens:
 * - Login: Displays the login screen.
 * - Register: Displays the registration screen.
 *
 * @component
 * @returns {React.ReactElement} The authentication stack navigator component.
 */
export const AuthNavigator: React.FC = (): React.ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            <AuthStack.Navigator initialRouteName={NavPath.Auth.Login}>
                <AuthStack.Screen
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
                    name='Registrera användare'
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
            </AuthStack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
