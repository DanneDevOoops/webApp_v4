/**
 * Module imports.
 */
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { DeliveryListItemProps } from '../../interfaces/Delivery';
import * as Style from '../../assets/styles';


/**
 * Component to display a delivery item in a list.
 *
 * @param {DeliveryListItemProps} props - The properties for the DeliveryListItem component.
 * @returns The rendered React component.
 */
export const DeliveryListItem = (props: DeliveryListItemProps): React.ReactElement => {
    return (
        <View key={props.item.id}>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {props.item.id}
                </Text>
                <Text style={Style.Typography.dataCenter as TextStyle}>
                    {props.item.product_name}
                </Text>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {props.item.delivery_date}
                </Text>
            </View>

            <View style={Style.Container.grid.column as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Kommentar:
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {props.item.comment}
                </Text>
            </View>
        </View>
    );
};
