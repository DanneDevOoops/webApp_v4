/**
 * @module screens/deliveriesdelivery-item-screen.tsx
 *
 * This module defines the screen for displaying detailed information about a selected delivery.
 * It includes the delivery's ID, product ID, product name, amount, and comment.
 * The screen is styled using the application's style constants.
 */
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { Delivery, DeliveryItemProps } from 'interfaces/delivery-interfaces';

/**
 * DeliveryItem screen/view.
 *
 * This component displays detailed information about a selected delivery.
 * It retrieves the delivery data from the route parameters and displays various attributes of
 * the delivery.
 *
 * @function
 * @param {DeliveryItemProps} props - The properties for the DeliveryItem component.
 * @returns {ReactElement} The rendered delivery item screen component.
 */
export const DeliveryItem: React.FC<DeliveryItemProps> = (
    props: DeliveryItemProps,
): ReactElement => {
    const item: Delivery | undefined = props.route?.params?.item;

    return (
        <View style={Style.Container.content}>
            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Inleverans ID: </Text>
                <Text style={Style.Typography.dataRight}>{item?.id}</Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Produkt ID: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item?.product_id}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Produktnamn: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item?.product_name}
                </Text>
            </View>

            <View style={Style.Container.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Antal: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item?.amount} st
                </Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={Style.Typography.dataLeft}>Kommentar: </Text>
                <Text style={Style.Typography.dataLeft}>{item?.comment}</Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
