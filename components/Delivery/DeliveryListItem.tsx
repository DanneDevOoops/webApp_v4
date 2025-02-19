/**
 * Module imports.
 */
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * DeliveryListItem object to return a touchable link element to delivery detail view.
 *
 * @param navigation
 * @param delivery
 * @constructor
 */
export const DeliveryListItem = ({ item }): React.ReactElement => {
    return (
        <View key={item.id}>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {item.id}
                </Text>
                <Text style={Style.Typography.dataCenter as TextStyle}>
                    {item.product_name}
                </Text>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {item.delivery_date}
                </Text>
            </View>

            <View style={Style.Container.grid.column as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Kommentar:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {item.comment}
                </Text>
            </View>
        </View>
    );
};
