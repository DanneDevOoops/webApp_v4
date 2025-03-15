/**
 * @module order-navigator.tsx
 *
 * This module defines the navigator for the orders section of the application.
 * It sets up a stack navigator with screens for displaying a list of orders and
 * detailed information about a selected order.
 */

import React, { ReactElement } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { createStackNavigator } from '@react-navigation/stack';

import { OrderList } from '../../components/order/order-list';
import { OrderItem } from './order-item-screen';
import { CoverImage } from '../../components/utils/cover-image';
import { NavigationPathKeys as NavPath } from '../../constants/navigation-constants';
import coverIMG from '../../assets/img/NutsAndBolts-3.jpg';
import * as Style from '../../assets/styles';

/**
 * @constant OrderStack - The stack navigator for the orders section.
 * It uses the `OrdersNavigatorParams` type for its route parameters.
 */
const OrderStack = createStackNavigator();

/**
 * OrderNavigator component.
 *
 * This component sets up a stack navigator for the orders section of the application.
 * It includes screens for displaying a list of orders and detailed information about a
 * selected order.
 *
 * @component
 * @returns {ReactElement} The rendered orders navigator component.
 */
export const OrderNavigator: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Order', image: coverIMG })}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Orderfliken innehåller en lista över ordrar. Ordrarna har
                    olika status internt innan dem skickas till kund.
                </Text>
            </View>

            <OrderStack.Navigator
                id={NavPath.Orders.OrdersScreen}
                initialRouteName={NavPath.Orders.OrdersList}>
                <OrderStack.Group navigationKey={NavPath.Orders.OrdersScreen}>
                    <OrderStack.Screen
                        key={NavPath.Orders.OrdersList}
                        navigationKey={NavPath.Orders.OrdersList}
                        name={NavPath.Orders.OrdersList}
                        component={OrderList}
                        options={{ title: 'Orderlista' }}
                    />

                    <OrderStack.Screen
                        key={NavPath.Orders.OrderItem}
                        navigationKey={NavPath.Orders.OrderItem}
                        name={NavPath.Orders.OrderItem}
                        component={OrderItem}
                        options={{ title: 'Orderdetaljer' }}
                    />
                </OrderStack.Group>
            </OrderStack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
