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
import { NavigationPathKeys, routeIcons } from '../constants/Navigation';
import { AppContext } from '../interfaces/AppContext';
import { AuthContextType } from '../interfaces/Auth.interfaces';
import * as Style from '../assets/styles/index';


/**
 * Bottom tabs navigator.
 */
const BottomTabs = createBottomTabNavigator();


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
    const authContext: AuthContextType = useAuthContext();
    const appContext: AppContext = useAppContext();

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
            key={NavigationPathKeys.Home.HomeScreen}
            navigationKey={NavigationPathKeys.Home.HomeScreen}
            name={NavigationPathKeys.Home.HomeScreen}
            component={Home}
            options={{
                title: NavigationPathKeys.Home.title,
            }}
        />
        <BottomTabs.Screen
            key={NavigationPathKeys.Products.ProductsScreen}
            navigationKey={NavigationPathKeys.Products.ProductsScreen}
            name={NavigationPathKeys.Products.ProductsScreen}
            component={ProductsNavigator}
            options={{
                title: NavigationPathKeys.Products.title,
            }}
        />
        <BottomTabs.Screen
            key={NavigationPathKeys.Orders.OrdersScreen}
            navigationKey={NavigationPathKeys.Orders.OrdersScreen}
            name={NavigationPathKeys.Orders.OrdersScreen}
            component={OrderNavigator}
            options={{ title: NavigationPathKeys.Orders.title }}
        />
        <BottomTabs.Screen
            key={NavigationPathKeys.Delivery.DeliveriesScreen}
            navigationKey={NavigationPathKeys.Delivery.DeliveriesScreen}
            name={NavigationPathKeys.Delivery.DeliveriesScreen}
            component={DeliveryNavigator}
            options={{ title: NavigationPathKeys.Delivery.title }}
        />
        {authContext.isLoggedIn ? (
            <BottomTabs.Screen
                key={NavigationPathKeys.Invoices.InvoicesScreen}
                navigationKey={NavigationPathKeys.Invoices.InvoicesScreen}
                name={NavigationPathKeys.Invoices.InvoicesScreen}
                component={InvoiceNavigator}
                options={{ title: NavigationPathKeys.Invoices.title }}
            />
        ) : (
            <BottomTabs.Screen
                key={NavigationPathKeys.Auth.AuthScreen}
                navigationKey={NavigationPathKeys.Auth.AuthScreen}
                name={NavigationPathKeys.Auth.AuthScreen}
                component={AuthNavigator}
                options={{ title: NavigationPathKeys.Auth.title }}
            />
        )}
    </>
);
