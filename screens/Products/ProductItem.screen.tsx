import React, { FC, ReactElement } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RouteParams } from '../../types/Navigation';
import { Product } from '../../interfaces/Product';
import * as Style from '../../assets/styles';

/**
 * ProductListItem screen/view.
 *
 * @constructor
 */
export const StockItem: FC = (): ReactElement => {
    const route = useRoute<RouteProp<{ params: RouteParams }>>();
    const product: Product | null = route.params.params?.item ?? null;

    return (
        <View style={Style.Container.content as ViewStyle}>
            <Text style={Style.Typography.subHeader as TextStyle}>
                {product?.name}
            </Text>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Produkt id:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {product?.id}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Artikel nr:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {product?.article_number}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Lagerplats:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {product?.location}
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Lagersaldo:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {product?.stock} st
                </Text>
            </View>

            <View style={Style.Container.grid.row as ViewStyle}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Pris:{' '}
                </Text>
                <Text style={Style.Typography.dataRight as TextStyle}>
                    {product?.price} kr/st
                </Text>
            </View>

            <View
                style={[
                    Style.Container.grid.row as ViewStyle,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Beskrivning:{' '}
                </Text>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {product?.description}
                </Text>
            </View>

            <View
                style={[
                    Style.Container.grid.row as ViewStyle,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    Specifikation:{' '}
                </Text>
                <Text style={Style.Typography.dataLeft as TextStyle}>
                    {product?.specifiers}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
