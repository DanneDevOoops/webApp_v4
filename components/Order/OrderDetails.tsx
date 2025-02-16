import React from 'react';
import { Text, View } from 'react-native';
import * as OrderInterfaces from '../../interfaces/Order';
import * as Style from '../../assets/styles';
import { ViewStyle, TextStyle } from 'react-native';

const OrderDetails = ({
    order,
    dynamicInteractionElement,
}: {
    order: OrderInterfaces.Order;
    dynamicInteractionElement: React.ReactElement;
}) => {
    return (
        <View style={Style.Container.content as ViewStyle}>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Order ID:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.id}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Status:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.status}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Status kod:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.status_id}
                </Text>
            </View>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Kund:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.name}
                </Text>
            </View>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Address:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.address}
                </Text>
            </View>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Postkod:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.zip}
                </Text>
            </View>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Stad:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {order.city}
                </Text>
            </View>
            {dynamicInteractionElement}
        </View>
    );
};
