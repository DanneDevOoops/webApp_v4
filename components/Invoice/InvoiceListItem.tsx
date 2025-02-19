/**
 * Module imports.
 */
import React from "react";
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import * as Style from "../../assets/styles";


/**
 * Product list item props type object. Used to type input props to component ProductListItem.
 */
type InvoiceListItemPropsType = {
    id: number;
    order_id: number;
    name: string,
    address: string,
    zip: string,
    city: string,
    country: string,
    total_price: number,
    creation_date: string,
    due_date: string
};


/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param props
 */
export const InvoiceListItem = (item: InvoiceListItemPropsType) => {
    console.log('props.item ', item);

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
