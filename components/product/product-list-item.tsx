/**
 * @module components/product/product-list-item.tsx
 *
 * This module defines the ProductListItem component.
 * It renders a touchable link element to the item detail view.
 */

import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { ProductListItemProps } from 'interfaces/product-interfaces';

/**
 * ProductListItem component.
 *
 * This component displays a row with product information, including the product name,
 * article number, and stock quantity. It is used in the product list to provide a
 * summary of each product.
 *
 * @function
 * @param {ProductListItemProps} props - The properties of the ProductListItem component.
 * @returns {ReactElement} The rendered ProductListItem component.
 */
export const ProductListItem: React.FC<ProductListItemProps> = ({
    item,
}: ProductListItemProps): ReactElement => {
    return (
        <View
            key={item.id}
            style={Style.Container.row}>
            <Text style={Style.Typography.dataLeft}>{item.name}</Text>
            <Text style={Style.Typography.dataCenter}>
                {item.article_number}
            </Text>
            <Text style={Style.Typography.dataRight}>{item.stock} st</Text>
        </View>
    );
};
