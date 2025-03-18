/**
 * @module screens/bottom-tabs-navigator.tsx
 *
 * This module defines the bottom tab navigator for the application.
 * It sets up a bottom tab navigator with screens for home, products, orders,
 * deliveries, and conditional screens for invoices or authentication based on
 * the user's login status.
 */

import { FontAwesome5 } from '@expo/vector-icons';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { ReactElement, useEffect } from 'react';

import { Home } from './home-screen';
import * as AuthModel from '../models/auth-models';
import { AuthNavigator } from './auth/auth-navigator';
import { DeliveryNavigator } from './deliveries/delivery-navigator';
import { InvoiceNavigator } from './invoices/invoices-navigator';
import { OrderNavigator } from './orders/order-navigator';
import { ProductsNavigator } from './products/products-navigator';
import * as Style from 'assets/styles/index';
import { LoadingIndicator } from 'components/utils/loading-indicator';
import { NavigationPathKeys, routeIcons } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { useAuthContext } from 'contexts/auth-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import { AuthContextType } from 'interfaces/auth-interfaces';

/**
 * @constant BottomTabs - The bottom tab navigator for the application.
 */
const BottomTabs = createBottomTabNavigator();

/**
 * BottomTabsNavigator component.
 *
 * This component sets up a bottom tab navigator for the application.
 * It includes screens for home, products, orders, deliveries, and conditional
 * screens for invoices or authentication based on the user's login status.
 *
 * @function
 * @returns {ReactElement} The rendered bottom tabs navigator component.
 */
export const BottomTabsNavigator: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const authContext: AuthContextType = useAuthContext();

    useEffect((): void => {
        void checkUserLoginStatus(authContext);
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
 * Checks the user's login status and updates the authentication contexts.
 *
 * @function
 * @param {AuthContextType} authContext - The authentication contexts.
 * @returns {Promise<void>} A promise that resolves when the login status is checked.
 */
const checkUserLoginStatus = async (
    authContext: AuthContextType,
): Promise<void> => {
    const isLoggedIn: boolean = await AuthModel.checkLoggedInStatus();
    authContext.setIsLoggedIn(isLoggedIn);
    await SecureStore.getItemAsync('token')
        .then((userString: string | null): boolean => {
            return !!(userString && userString.length > 0);
        })
        .catch((error): boolean => {
            console.error(error);
            return false;
        });
};

/**
 * Returns the screen options for the bottom tab navigator.
 *
 * @function
 * @param {Object} param - The parameter object.
 * @param {RouteProp<ParamListBase, string>} param.route - The route prop.
 * @returns {BottomTabNavigationOptions} The screen options for the bottom tab navigator.
 */
const getScreenOptions = ({
    route,
}: {
    route: RouteProp<ParamListBase, string>;
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
    tabBarActiveTintColor: Style.Color.schemeOne.secondary[300] as string,
    tabBarInactiveTintColor: Style.Color.grayScale[200] as string,
    headerShown: false,
});

/**
 * Returns the bottom tab screens based on the user's login status.
 *
 * @function
 * @param {AuthContextType} authContext - The authentication contexts.
 * @returns {ReactElement} The bottom tab screens.
 */
const getBottomTabScreens: React.FC<AuthContextType> = (
    authContext: AuthContextType,
): ReactElement => (
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
