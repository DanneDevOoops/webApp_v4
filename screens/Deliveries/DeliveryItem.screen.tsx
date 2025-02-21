/**
 * Module imports.
 */
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as DeliveryInterfaces from '../../interfaces/Delivery';
import * as Style from '../../assets/styles';


/**
 * DeliveryListItem screen/view.
 *
 * @param props
 * @constructor
 */
export const DeliveryItem: (
    props: DeliveryInterfaces.DeliveryItemProps,
) => React.JSX.Element = (props: DeliveryInterfaces.DeliveryItemProps) => {
    const item = props.route.params.item;

    return (
        <View style={Style.Container.content as ViewStyle}>
            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Inleverans ID:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {item.id}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Produkt ID:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {item.product_id}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Produktnamn:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {item.product_name}
                </Text>
            </View>

            <View style={Style.Container.flexBox.rowNoPadding as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Antal:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {item.amount} st
                </Text>
            </View>

            <View
                style={[
                    Style.Container.grid.column as ViewStyle,
                    {
                        paddingTop: Style.Typography.whiteSpace[100],
                        paddingBottom: Style.Typography.whiteSpace[200],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Kommentar:{' '}
                </Text>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {item.comment}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
