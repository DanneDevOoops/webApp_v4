/**
 * Auth Navigator module.
 *
 * This module defines the authentication navigator for the application.
 * It includes screens for user login and registration.
 *
 * @module AuthNavigator
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
 * If the user is logged in, it shows the InvoiceNavigator. Otherwise, it shows the Login and Register
 * screens.
 *
 * @constructor
 * @returns {React.ReactElement} The authentication stack navigator component.
 */
export const AuthNavigator: React.FC = (): React.ReactElement => {
    // const authContext = useAuthContext();
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            <Stack.Navigator initialRouteName='Logga in formulär'>
                {
                    <>
                        <Stack.Screen
                            name='Logga in formulär'
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
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
