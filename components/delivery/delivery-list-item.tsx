/**
 * @module components/delivery/delivery-list-item.tsx
 *
 * This module defines the component for displaying a delivery item in a list.
 * It renders the delivery details including the product name, delivery date, and comments.
 */

import React from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { DeliveryListItemProps } from 'interfaces/delivery-interfaces';

/**
 * DeliveryListItem component.
 *
 * This component displays a delivery item in a list. It shows the delivery ID, product name,
 * delivery date, and any comments associated with the delivery.
 *
 * @function
 * @param {DeliveryListItemProps} props - The properties for the DeliveryListItem component.
 * @returns {ReactElement} The rendered DeliveryListItem component.
 */
export const DeliveryListItem = (
    props: DeliveryListItemProps,
): React.ReactElement => {
    return (
        <View key={props.item.id}>
            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
                <Text style={Style.Typography.dataCenter}>
                    {props.item.product_name}
                </Text>
                <Text style={Style.Typography.dataLeft}>
                    {props.item.delivery_date}
                </Text>
            </View>

            <View style={Style.Container.gridColumn}>
                <Text style={Style.Typography.dataLeft}>Kommentar:</Text>
                <Text style={Style.Typography.dataRight}>
                    {props.item.comment}
                </Text>
            </View>
        </View>
    );
};
