import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import {StatusBar} from 'expo-status-bar';
import * as Style from '../../assets/styles';


/**
 * InvoiceItem screen/view.
 *
 * @constructor
 * @param props
 */
export const InvoiceItem = (
    props: InvoiceInterfaces.InvoiceItemProps
): React.ReactElement => {
    const invoice = props.route.params.item;

    return (
        <View style={Style.Base.content as ViewStyle}>
            <Text style={Style.Typography.subHeader as TextStyle}>
                {invoice.id}
            </Text>

            <View style={Style.Container.flexBox.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Faktura id:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {invoice.order_id}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Fakturanummer:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {invoice.total_price}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Kund:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {invoice.creation_date.toString()}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Datum:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {invoice.due_date.toString()}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
