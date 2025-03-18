/**
 * @module screens/products/product-item-screen.tsx
 *
 * This module defines the screen for displaying detailed information about a selected product.
 * It includes the product's name, ID, article number, location, stock, price, description, and
 * specifiers. The screen is styled using the application's style constants.
 */

import { RouteProp, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { Product, ProductListItemProps } from 'interfaces/product-interfaces';

/**
 * StockItem component.
 *
 * This component displays detailed information about a selected product.
 * It retrieves the product data from the route parameters and displays various attributes of
 * the product.
 *
 * @function
 * @returns {ReactElement} The rendered product item screen component.
 */
export const StockItem: React.FC = (): ReactElement => {
    const route: RouteProp<ProductListItemProps> =
        useRoute<RouteProp<ProductListItemProps>>();
    // @ts-expect-error  Property 'item' does not exist on type 'RouteProp<ParamListBase, string>'.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const product: Product | null = route.params?.item ?? null;

    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>{product?.name}</Text>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Produkt id: </Text>
                <Text style={Style.Typography.dataRight}>{product?.id}</Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Artikel nr: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product?.article_number}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Lagerplats: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product?.location}
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Lagersaldo: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product?.stock} st
                </Text>
            </View>

            <View style={Style.Container.row}>
                <Text style={Style.Typography.dataLeft}>Pris: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product?.price} kr/st
                </Text>
            </View>

            <View
                style={[
                    Style.Container.row,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft}>Beskrivning: </Text>
                <Text style={Style.Typography.dataLeft}>
                    {product?.description}
                </Text>
            </View>

            <View
                style={[
                    Style.Container.row,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft}>Specifikation: </Text>
                <Text style={Style.Typography.dataLeft}>
                    {product?.specifiers}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
