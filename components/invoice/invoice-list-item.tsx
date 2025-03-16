import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { Invoice } from 'interfaces/invoice-interfaces';

/**
 * InvoiceListItem component displays a single invoice item in a list.
 *
 * @param {Invoice} item - The invoice item to be displayed.
 * @returns {ReactElement} A React element representing the invoice item.
 */
export const InvoiceListItem: React.FC<Invoice> = (
    item: Invoice,
): ReactElement => {
    return (
        <View
            key={item.id.toString()}
            style={Style.Button.listButton}>
            <Text style={Style.Typography.dataLeft}>{item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{item.name}</Text>
            <Text style={Style.Typography.dataRight}>{item.order_id} st</Text>
        </View>
    );
};
