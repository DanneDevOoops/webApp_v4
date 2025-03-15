/**
 * Module imports.
 */
import React from 'react';
import { Text, View } from 'react-native';
import { DeliveryListItemProps } from '../../interfaces/delivery-interfaces';
import * as Style from '../../assets/styles';

/**
 * Component to display a delivery item in a list.
 *
 * @param {DeliveryListItemProps} props - The properties for the DeliveryListItem component.
 * @returns The rendered React component.
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
