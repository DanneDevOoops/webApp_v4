import React from 'react';
import {
    ListRenderItem,
    Pressable,
    PressableStateCallbackType,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { OrderListItem } from './order-list-item';
import { NavigationPathKeys as NavPath } from '../../constants/navigation-constants';
import { Order, OrderItemProp } from '../../interfaces/order-interfaces';
import * as Style from '../../assets/styles';

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
