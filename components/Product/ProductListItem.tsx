/**
 * Module imports.
 */
import React, { FC, ReactElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { ProductListItemProps } from '../../interfaces/Product';
import * as Style from '../../assets/styles';

/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param {ProductListItemProps} props - The properties of the ProductListItem component.
 */
export const ProductListItem: FC<ProductListItemProps> = ({
    item,
}: ProductListItemProps): ReactElement => {
    return (
        <View
            key={item.id}
            style={Style.Container.grid.row as ViewStyle}>
            <Text style={Style.Typography.dataLeft as TextStyle}>
                {item.name}
            </Text>
            <Text style={Style.Typography.dataCenter as TextStyle}>
                {item.article_number}
            </Text>
            <Text style={Style.Typography.dataRight as TextStyle}>
                {item.stock} st
            </Text>
        </View>
    );
};
