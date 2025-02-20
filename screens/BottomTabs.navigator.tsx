/**
 * @module BottomTabsNavigator
 *
 * This module sets up a bottom tab navigator for the main sections of the application.
 * It includes the following tabs:
 * - Home: Displays the home screen.
 * - Products: Displays the products screen.
 * - Orders: Displays the orders screen.
 * - Deliveries: Displays the deliveries screen.
 * - Invoices: Displays the invoices screen (only if the user is logged in).
 * - Login: Displays the login screen (only if the user is not logged in).
 *
 * The navigator is wrapped in a loading indicator to handle the loading state.
 * It also includes icons for each tab using FontAwesome5.
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
 * @requires ../interfaces/Auth.interfaces
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
import { AuthContextType } from '../interfaces/Auth.interfaces';


/**
 * Bottom tabs navigator.
 */
const BottomTabs = createBottomTabNavigator();


/**
 * Bottom tabs navigator icons.
 */
const routeIcons: { [key: string]: string } = {
    Faktura: 'file-invoice-dollar',
    Home: 'home',
    Inleveranser: 'dolly',
    Lager: 'layer-group',
    Order: 'truck',
    // Login: 'lock',
    Login: 'key',
};


/**
 * BottomTabsNavigator component.
 *
 * This component sets up a bottom tab navigator for the main sections of the application.
 * It includes the following tabs:
 * - Home: Displays the home screen.
 * - Products: Displays the products screen.
 * - Orders: Displays the orders screen.
 * - Deliveries: Displays the deliveries screen.
 * - Invoices: Displays the invoices screen (only if the user is logged in).
 * - Login: Displays the login screen (only if the user is not logged in).
 *
 * The navigator is wrapped in a loading indicator to handle the loading state.
 * It also includes icons for each tab using FontAwesome5.
 *
 * @component
 * @returns {React.ReactElement} The bottom tabs navigator component.
 */
export const BottomTabsNavigator: React.FC = (): React.ReactElement => {
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
 * @param {AuthContextType} authContext - The authentication context.
 */
const checkUserLoginStatus = async (authContext: AuthContextType) => {
    const isLoggedIn: boolean = await AuthModel.loggedIn();
    authContext.setIsLoggedIn(isLoggedIn);

    SecureStore.getItemAsync('user')
        .then((userString: string | null): void => {
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
 * @param {object} param - The parameter object.
 * @param {RouteProp<any, any>} param.route - The route prop.
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
 * @param {AuthContextType} authContext - The authentication context.
 * @returns {React.ReactElement} The bottom tab screens.
 */
const getBottomTabScreens = (
    authContext: AuthContextType,
): React.ReactElement => (
    <>
        <BottomTabs.Screen
            key='Hem'
            name='Hem'
            component={Home}
        />
        <BottomTabs.Screen
            key='Lager'
            name='Lager'
            component={ProductsNavigator}
        />
        <BottomTabs.Screen
            key='Order'
            name='Order'
            component={OrderNavigator}
        />
        <BottomTabs.Screen
            key='Inleveranser'
            name='Inleveranser'
            component={DeliveryNavigator}
        />
        {authContext.isLoggedIn ? (
            <BottomTabs.Screen
                key='Fakturor'
                name='Fakturor'
                component={InvoiceNavigator}
            />
        ) : (
            <BottomTabs.Screen
                key='Logga in'
                name='Logga in'
                component={AuthNavigator}
            />
        )}
    </>
);
