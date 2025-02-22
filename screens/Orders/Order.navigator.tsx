/**
 * @module OrderNavigator
 *
 * This module sets up a stack navigator for the order-related screens in the application.
 * It includes a cover image, introductory text, and two screens:
 * - OrderList: Displays a list of orders.
 * - OrderItem: Displays detailed information about a selected order.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 */
import React, { FC, ReactElement } from 'react';
import { SafeAreaView, Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { OrderList } from '../../components/Order/OrderList';
import { OrderItem } from './OrderItem.screen';
import { CoverImage } from '../../components/Utils/CoverImage';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import coverIMG from '../../assets/img/NutsAndBolts-3.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for orders.
 */
const Stack = createStackNavigator();


/**
 * Order Stack Navigator.
 *
 * This component sets up a stack navigator for the order-related screens.
 * It includes a cover image, introductory text, and two screens:
 * - OrderList: Displays a list of orders.
 * - OrderItem: Displays detailed information about a selected order.
 *
 * @constructor
 * @returns {ReactElement} The order stack navigator component.
 */
export const OrderNavigator: FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Order', image: coverIMG })}

            <View style={Style.Container.screenIntroductory as ViewStyle}>
                <Text style={Style.Typography.paragraph as TextStyle}>
                    Orderfliken innehåller en lista över ordrar. Ordrarna har
                    olika status internt innan dem skickas till kund.
                </Text>
            </View>

            <Stack.Navigator
                id={NavPath.Orders.OrdersScreen}
                initialRouteName={NavPath.Orders.OrdersList}>
                <Stack.Group navigationKey={NavPath.Orders.OrdersScreen}>
                    <Stack.Screen
                        key={NavPath.Orders.OrdersList}
                        navigationKey={NavPath.Orders.OrdersList}
                        name={NavPath.Orders.OrdersList}
                        component={OrderList}
                        options={{ title: 'Orderlista' }}
                    />

                    <Stack.Screen
                        key={NavPath.Orders.OrderItem}
                        navigationKey={NavPath.Orders.OrderItem}
                        name={NavPath.Orders.OrderItem}
                        component={OrderItem}
                        options={{ title: 'Orderdetaljer' }}
                    />
                </Stack.Group>
            </Stack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
