/**
 * @module BottomTabsNavigator
 *
 * This module sets up the bottom tab navigator for the application.
 * It includes various navigators for different sections of the app such as Home, Orders, Products,
 * Deliveries, Invoices, and Authentication.
 * The navigator dynamically adjusts the available tabs based on the user's authentication status.
 *
 * @requires react
 * @requires @react-navigation/bottom-tabs
 * @requires @react-navigation/native
 * @requires expo-secure-store
 * @requires ../models/Auth
 * @requires ../context/Auth.provider
 * @requires ../context/App.provider
 * @requires ./Home.screen
 * @requires ./Deliveries/Delivery.navigator
 * @requires ./Auth/Auth.navigator
 * @requires ./Orders/Order.navigator
 * @requires ./Products/Products.navigator
 * @requires ./Invoices/Invoices.navigator
 * @requires ../components/Utils/LoadingIndicator
 * @requires @expo/vector-icons
 * @requires ../assets/styles/index
 */

import React, { useEffect } from 'react';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as AuthModel from '../models/Auth';
import { useAuthContext } from '../context/Auth.provider';
import { useAppContext } from '../context/App.provider';
import { Home } from './Home.screen';
import { DeliveryNavigator } from './Deliveries/Delivery.navigator';
import { AuthNavigator } from './Auth/Auth.navigator';
import { OrderNavigator } from './Orders/Order.navigator';
import { ProductsNavigator } from './Products/Products.navigator';
import { InvoiceNavigator } from './Invoices/Invoices.navigator';
import { LoadingIndicator } from '../components/Utils/LoadingIndicator';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Style from '../assets/styles/index';

/**
 * Bottom tabs navigator.
 */
const BottomTabs = createBottomTabNavigator();

/**
 * Bottom tabs navigator icons.
 */
const routeIcons = {
    Faktura: 'file-invoice-dollar',
    Home: 'home',
    Inleveranser: 'dolly',
    Lager: 'layer-group',
    Login: 'lock',
    Order: 'truck',
    // Login: 'key',
};

/**
 * Bottom Navigation Bar.
 *
 * The Navigation bar is the main navigation of the application.
 * It is used to navigate between the different screens.
 * Each screen may have several underlying screens navigated through a nested stack navigator.
 *
 * @constructor
 * @returns {React.ReactElement} The bottom tabs navigator component.
 */
export const BottomTabsNavigator: () => React.ReactElement = () => {
    const authContext = useAuthContext();
    const appContext = useAppContext();

    useEffect((): void => {
        checkUserLoginStatus(authContext);
    }, []);

    if (appContext.isLoading) {
        return <LoadingIndicator loadingType={undefined} />;
    }

    return appContext.isLoading ? (
        <LoadingIndicator loadingType={undefined} />
    ) : (
        <BottomTabs.Navigator screenOptions={getScreenOptions}>
            {getBottomTabScreens(authContext)}
        </BottomTabs.Navigator>
    );
};

/**
 * Check the user's login status and update the authentication context.
 *
 * @param {object} authContext - The authentication context.
 */
const checkUserLoginStatus = async (authContext) => {
    const isLoggedIn: boolean = await AuthModel.loggedIn();
    authContext.setIsLoggedIn(isLoggedIn);

    SecureStore.getItemAsync('user')
        .then((userString: string): void => {
            if (userString) {
                console.log('userString', userString);
            }
        })
        .catch((error): void => {
            console.log(error);
        });
};

/**
 * Get the screen options for the bottom tab navigator.
 *
 * @param {object} route - The route object.
 * @returns {BottomTabNavigationOptions} The screen options.
 */
const getScreenOptions = ({
    route,
}: {
    route: RouteProp<any, any>;
}): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color, size }) => {
        const iconName = routeIcons[route.name] || 'list';
        return (
            <FontAwesome5
                name={iconName}
                size={size}
                color={color}
            />
        );
    },
    tabBarActiveTintColor: Style.Color.schemeOne.secondary[300],
    tabBarInactiveTintColor: Style.Color.grayScale[200],
    headerShown: false,
});

/**
 * Get the bottom tab screens based on the user's login status.
 *
 * @param {object} authContext - The authentication context.
 * @returns {React.ReactElement} The bottom tab screens.
 */
const getBottomTabScreens = (authContext) => (
    <>
        <BottomTabs.Screen
            name='Hem'
            component={Home}
        />
        <BottomTabs.Screen
            name='Lager'
            component={ProductsNavigator}
        />
        <BottomTabs.Screen
            name='Order'
            component={OrderNavigator}
        />
        <BottomTabs.Screen
            name='Inleveranser'
            component={DeliveryNavigator}
        />
        {authContext.isLoggedIn ? (
            <BottomTabs.Screen
                name='Fakturor'
                component={InvoiceNavigator}
            />
        ) : (
            <BottomTabs.Screen
                name='Logga in'
                component={AuthNavigator}
            />
        )}
    </>
);
