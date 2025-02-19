/**
 * Module imports.
 */
import React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * Product list item props type object. Used to type input props to component ProductListItem.
 */
type StockListItemPropsType = {
    item: {
        name: string;
        article_number: string;
        stock: number;
    };
};

/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param props
 */
export const ProductListItem = (props: StockListItemPropsType) => {
    return (
        <View
            key={props.item.id.toString()}
            style={Style.Container.grid.row as ViewStyle}>
            <Text style={Style.Typography.dataLeft as TextStyle}>
                {props.item.name}
            </Text>
            <Text style={Style.Typography.dataCenter as TextStyle}>
                {props.item.article_number}
            </Text>
            <Text style={Style.Typography.dataRight as TextStyle}>
                {props.item.stock} st
            </Text>
        </View>
    );
};
