/**
 * @module products-navigator.tsx
 *
 * This module defines the navigator for the products section of the application.
 * It sets up a stack navigator with screens for displaying a list of products and
 * detailed information about a selected product.
 */

import React, { ReactElement } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { createStackNavigator } from '@react-navigation/stack';

import { ProductList } from '../../components/product/product-list';
import { CoverImage } from '../../components/utils/cover-image';
import { StockItem } from './product-item-screen';
import { NavigationPathKeys as NavPath } from '../../constants/navigation-constants';
import { ProductsNavigatorParams } from '../../interfaces/product-interfaces';
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';

/**
 * @constant ProductsStack - The stack navigator for the products section.
 * It uses the `ProductsNavigatorParams` type for its route parameters.
 */
const ProductsStack = createStackNavigator<ProductsNavigatorParams>();

/**
 * ProductsNavigator component.
 *
 * This component sets up a stack navigator for the products section of the application.
 * It includes screens for displaying a list of products and detailed information about a
 * selected product.
 *
 * @component
 * @returns {ReactElement} The rendered products navigator component.
 */
export const ProductsNavigator: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Lager', image: coverIMG })}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Listan innehåller lagerförda produkter. Varje produkt har
                    ett namn, ett artikelnr. och antal i lager.
                </Text>

                <Text style={Style.Typography.paragraph}>
                    Om du klickar på en produkt får du mer information om den.
                </Text>
            </View>

            <ProductsStack.Navigator
                id={NavPath.Products.ProductsScreen}
                initialRouteName={NavPath.Products.ProductsList}>
                <ProductsStack.Group
                    navigationKey={NavPath.Products.ProductsScreen}>
                    <ProductsStack.Screen
                        key={NavPath.Products.ProductsList}
                        navigationKey={NavPath.Products.ProductsList}
                        name={NavPath.Products.ProductsList}
                        component={ProductList}
                        options={{ title: 'Produkter' }}
                    />
                    <ProductsStack.Screen
                        key={NavPath.Products.ProductItem}
                        navigationKey={NavPath.Products.ProductItem}
                        name={NavPath.Products.ProductItem}
                        component={StockItem}
                        options={{ title: 'Produktspecifikation' }}
                    />
                </ProductsStack.Group>
            </ProductsStack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
