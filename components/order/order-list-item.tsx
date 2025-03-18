/**
 * @module components/order/order-list-item.tsx
 *
 * This module defines the OrderListItem component for rendering individual order items.
 * It sets up a view component for each order item, displaying its ID, name, and status.
 */

import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { OrderListItemPropsType } from 'interfaces/order-interfaces';

/**
 * OrderListItem component.
 *
 * This component renders an individual order item within a view. It displays the order item's
 * ID, name, and status using styled text components.
 *
 * @function
 * @param {OrderListItemPropsType} props - The props of the component, containing the order
 * item details.
 * @returns {ReactElement} A React element representing a view with the order item's details.
 */
export const OrderListItem: React.FC<OrderListItemPropsType> = (
    props: OrderListItemPropsType,
): ReactElement => {
    return (
        <View
            key={props.item.id}
            style={Style.Container.row}>
            <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{props.item.name}</Text>
            <Text style={Style.Typography.dataRight}>
                {props.item.status_id}
            </Text>
        </View>
    );
};
