/**
 * @module AuthNavigator
 *
 * This module defines the authentication navigator for the application.
 * It includes screens for user login and registration.
 *
 * @requires react
 * @requires react-native
 * @requires @react-navigation/stack
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../assets/styles
 * @requires ./Login.screen
 * @requires ./Register.screen
 */

import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import { Login } from './Login.screen';
import { Register } from './Register.screen';
import * as Style from '../../assets/styles';
import { StatusBar } from 'expo-status-bar';


const Stack = createStackNavigator();


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
            <Stack.Navigator initialRouteName='Logga in formulär'>
                {
                    <>
                        <Stack.Screen
                            key='Logga in formulär'
                            name='Logga in formulär'
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            key='Registrera användare'
                            name='Registrera användare'
                            component={Register}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </>
                }
            </Stack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
