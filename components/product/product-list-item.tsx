/**
 * @module product-list-item.tsx
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
 * @component
 * @param {ProductListItemProps} props - The properties of the ProductListItem component.
 * @param {Object} props.item - The product item to display.
 * @param {string} props.item.id - The unique identifier of the product.
 * @param {string} props.item.name - The name of the product.
 * @param {string} props.item.article_number - The article number of the product.
 * @param {number} props.item.stock - The stock quantity of the product.
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
