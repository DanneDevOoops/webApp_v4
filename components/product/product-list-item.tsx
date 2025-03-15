/**
 * Module imports.
 */
import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { ProductListItemProps } from '../../interfaces/product-interfaces';
import * as Style from '../../assets/styles';

/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param {ProductListItemProps} props - The properties of the ProductListItem component.
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
