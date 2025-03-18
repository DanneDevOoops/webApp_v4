/**
 * @module components/invoice/invoice-list-item.tsx
 * @category Invoice Management
 * @group Components
 *
 * @remarks
 * This module defines the InvoiceListItem component for rendering individual invoice items.
 * It sets up a view component for each invoice item, displaying its ID, name, and order ID.
 *
 * @author Daniel Andersson
 */

import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { Invoice } from 'interfaces/invoice-interfaces';

/**
 * InvoiceListItem component.
 *
 * @remarks
 * This component renders an individual invoice item within a view. It displays the invoice item's
 * ID, name, and order ID using styled text components.
 *
 * @function
 * @category Invoice Management
 * @returns {ReactElement} A React element representing a view with the invoice item's details.
 *
 * @author Daniel Andersson
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
