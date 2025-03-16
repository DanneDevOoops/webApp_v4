/**
 * @module rendered-order-list-item.tsx
 *
 * This module defines the renderItem function for rendering individual order items.
 * It sets up a pressable component for each order item, which navigates to the order
 * details screen when pressed.
 */

import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    ListRenderItem,
    Pressable,
    PressableStateCallbackType,
} from 'react-native';

import { OrderListItem } from './order-list-item';
import * as Style from 'assets/styles';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { Order, OrderItemProp } from 'interfaces/order-interfaces';

/**
 * Navigates to the order item screen with the given order item.
 *
 * This function uses the navigation object to dispatch a navigation action
 * to the 'Orderhanterare' screen, passing the selected order item as a parameter.
 *
 * @function
 * @param {OrderItemProp['item']} item - The order item to navigate to.
 * @returns {void}
 */
function navigateToOrderItem(item: OrderItemProp['item']): void {
    const navigation = useNavigation();

    navigation.dispatch(
        CommonActions.navigate(NavPath.Orders.OrdersScreen, {
            screen: NavPath.Orders.OrderItem,
            params: { item, reload: true },
        }),
    );
}

/**
 * Renders an individual order item as a pressable component.
 *
 * This function component takes an order item and renders it within a `Pressable`
 * component to make it interactive. The `Pressable` component changes its background color
 * based on the press state to provide visual feedback to the user. Upon pressing, it
 * navigates to the 'Orderhanterare' screen with the pressed order item as a parameter.
 *
 * @function
 * @param {OrderItemProp} {item} - The order item to be rendered. It is an object
 * containing order details.
 * @returns {ReactElement} A pressable component representing an individual order item.
 */
export const renderItem: ListRenderItem<Order> = ({
    item,
}: OrderItemProp): React.ReactElement => {
    return (
        <Pressable
            key={item.id}
            style={({ pressed }: PressableStateCallbackType) => [
                Style.Button.listButton,
                {
                    backgroundColor: pressed
                        ? Style.Color.schemeOne.primary[200]
                        : Style.Color.schemeOne.primary[300],
                },
            ]}
            onPress={(): void => {
                navigateToOrderItem(item);
            }}>
            <OrderListItem item={item} />
        </Pressable>
    );
};
