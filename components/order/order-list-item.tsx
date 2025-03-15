import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { OrderListItemPropsType } from '../../interfaces/order-interfaces';
import * as Style from '../../assets/styles';

/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @constructor
 * @param {OrderListItemPropsType} props - The props of the component.
 * @returns {ReactElement} - A React element representing a touchable link to order detail view.
 * @exports OrderListItem
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
