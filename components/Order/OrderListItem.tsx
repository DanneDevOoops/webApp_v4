import React, { FC, ReactElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { OrderListItemPropsType } from '../../interfaces/Order';
import * as Style from '../../assets/styles';

/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @constructor
 * @param {OrderListItemPropsType} props - The props of the component.
 * @returns {ReactElement} - A React element representing a touchable link to order detail view.
 * @exports OrderListItem
 */
export const OrderListItem: FC<OrderListItemPropsType> = (
    props: OrderListItemPropsType,
): ReactElement => {
    return (
        <View
            key={props.item.id}
            style={Style.Container.grid.row as ViewStyle}>
            <Text style={Style.Typography.dataLeft as TextStyle}>
                {props.item.id}
            </Text>
            <Text style={Style.Typography.dataCenter as TextStyle}>
                {props.item.name}
            </Text>
            <Text style={Style.Typography.dataRight as TextStyle}>
                {props.item.status_id}
            </Text>
        </View>
    );
};
