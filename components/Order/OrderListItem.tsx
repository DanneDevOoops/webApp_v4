/**
 * Module imports.
 */
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * Order list item props type object. Used to type input props to component OrderListItem.
 */
type OrderListItemPropsType = {
    item: {
        id: number;
        name: string;
        status_id: string;
    };
};

/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @constructor
 * @param props
 */
export const OrderListItem = (props): React.ReactElement => {
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
