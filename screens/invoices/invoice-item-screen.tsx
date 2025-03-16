/**
 * @module invoice-item-screen.tsx
 *
 * This module defines the screen for displaying detailed information about a selected invoice.
 * It includes the invoice's ID, order ID, customer name, address, zip code, city, country,
 * total price, creation date, and due date. The screen is styled using the application's style
 * constants.
 */

import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { Invoice, InvoiceItemProps } from 'interfaces/invoice-interfaces';

/**
 * InvoiceItem screen/view.
 *
 * This component displays detailed information about a selected invoice.
 * It retrieves the invoice data from the route parameters and displays various attributes of
 * the invoice.
 *
 * @component
 * @param {InvoiceItemProps} props - The properties for the InvoiceItem component.
 * @returns {ReactElement} The rendered invoice item screen component.
 */
export const InvoiceItem: React.FC<InvoiceItemProps> = (
    props: InvoiceItemProps,
): ReactElement => {
    const invoice: Invoice | undefined = props.route?.params.item;

    console.log('props: ', props);
    console.log('invoice: ', invoice);

    return (
        <View style={Style.Base.content}>
            <Text style={Style.Typography.subHeader}>
                Fakturanr. {invoice?.id}
            </Text>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Ordernr. </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.order_id}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Kund: </Text>
                <Text style={Style.Typography.dataRight}>{invoice?.name}</Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Adress: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.address}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Postnummer: </Text>
                <Text style={Style.Typography.dataRight}>{invoice?.zip}</Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Stad: </Text>
                <Text style={Style.Typography.dataRight}>{invoice?.city}</Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Land: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.country}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Fakturabelopp: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.total_price} kr
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Fakturadatum: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.creation_date.toString()}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Förfallodatum: </Text>
                <Text style={Style.Typography.dataRight}>
                    {invoice?.due_date.toString()}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
