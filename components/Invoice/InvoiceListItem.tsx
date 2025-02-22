import React, { FC, ReactElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { Invoice } from '../../interfaces/Invoice';
import * as Style from '../../assets/styles';

/**
 * InvoiceListItem component displays a single invoice item in a list.
 *
 * @param {Invoice} item - The invoice item to be displayed.
 * @returns {ReactElement} A React element representing the invoice item.
 */
export const InvoiceListItem: FC<Invoice> = (item: Invoice): ReactElement => {
    return (
        <View
            key={item.id.toString()}
            style={Style.Button.listButton as ViewStyle}>
            <Text style={Style.Typography.dataLeft as TextStyle}>
                {item.id}
            </Text>
            <Text style={Style.Typography.dataCenter as TextStyle}>
                {item.name}
            </Text>
            <Text style={Style.Typography.dataRight as TextStyle}>
                {item.order_id} st
            </Text>
        </View>
    );
};
