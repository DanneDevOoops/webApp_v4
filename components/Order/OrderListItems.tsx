import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import * as OrderInterfaces from '../../interfaces/Order';
import * as Style from '../../assets/styles';
import {ProductStockStatus} from './ProductStockStatus';


const OrderListItems = ({ order }: { order: OrderInterfaces.Order }) => {
    return (
            {order.order_items.map(
                (orderListItem: OrderInterfaces.OrderItem, index: number) => (
                    <View key={index}>
                        <View style={Style.Container.grid as ViewStyle}>
                            <View style={Style.Container.grid.row as ViewStyle}>
                                <View
                                    style={
                                        Style.Container.grid.col[1] as ViewStyle
                                    }>
                                    <Text>{index + 1}. </Text>
                                </View>
                                <View
                                    style={
                                        Style.Container.grid.col[7] as ViewStyle
                                    }>
                                    <View
                                        style={
                                            Style.Container.grid
                                                .row as ViewStyle
                                        }>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataLeft as TextStyle
                                            }>
                                            {orderListItem.name}
                                        </Text>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataCenter as TextStyle
                                            }>
                                            {orderListItem.article_number}
                                        </Text>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataRight as TextStyle
                                            }>
                                            {orderListItem.amount} st.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={Style.Container.grid.row as ViewStyle}>
                                <View
                                    style={
                                        Style.Container.grid.col[1] as ViewStyle
                                    }>
                                    <Text> </Text>
                                </View>
                                <View
                                    style={
                                        Style.Container.grid.col[7] as ViewStyle
                                    }>
                                    <View
                                        style={
                                            Style.Container.grid
                                                .row as ViewStyle
                                        }>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataLeft as TextStyle
                                            }>
                                            Lagerplats:
                                        </Text>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataCenter as TextStyle
                                            }>
                                            {orderListItem.location}
                                        </Text>
                                        <Text
                                            style={
                                                Style.Typography
                                                    .dataRight as TextStyle
                                            }>
                                            {orderListItem.stock} st.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {order.status_id === 100 ? (
                            <View
                                style={[
                                    Style.Container.grid.row as ViewStyle,
                                    {
                                        paddingVertical:
                                            Style.Typography.whiteSpace[75],
                                        marginBottom:
                                            index < order.order_items.length - 1
                                                ? Style.Typography
                                                      .whiteSpace[100]
                                                : Style.Typography
                                                      .whiteSpace[50],
                                        borderBottomColor:
                                            index < order.order_items.length - 1
                                                ? Style.Color.grayScale[200]
                                                : '',
                                        borderBottomWidth:
                                            index < order.order_items.length - 1
                                                ? 0.3
                                                : 0,
                                    } as ViewStyle,
                                ]}>
                                <ProductStockStatus orderItem={orderListItem} />
                            </View>
                        ) : (
                            <View
                                style={[
                                    Style.Container.grid.row as ViewStyle,
                                    {
                                        borderBottomColor:
                                            index < order.order_items.length - 1
                                                ? Style.Color.grayScale[200]
                                                : '',
                                        borderBottomWidth:
                                            index < order.order_items.length - 1
                                                ? 0.3
                                                : 0,
                                    } as ViewStyle,
                                ]}></View>
                        )}
                    </View>
                ),
            )}
    );
};
