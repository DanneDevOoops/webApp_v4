/**
 * @module product-list.tsx
 *
 * This module defines the ProductList component.
 * It displays a list of products fetched from an API and handles navigation to product details.
 */

import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import React, { ReactElement, useCallback } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    Pressable,
    PressableStateCallbackType,
    ViewStyle,
} from 'react-native';

import { ProductListItem } from './product-list-item';
import * as Style from 'assets/styles';
import { LoadingIndicator } from 'components/utils/loading-indicator';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import { Product } from 'interfaces/product-interfaces';
import { getProducts } from 'models/products-models';
import { RouteParams } from 'types/navigation-types';
import { FunctionVoidType } from 'types/utils-types';

/**
 * ProductList component.
 *
 * This component displays a list of products fetched from an API.
 * It utilizes the `useFocusEffect` hook to reload products when the component is focused.
 * Products are displayed using a `FlatList` component from `react-native`.
 * Each product item is rendered as a `Pressable` component, which navigates to a product
 * specification view on press.
 *
 * The component also handles loading states and displays a `LoadingIndicator` component while
 * products are being fetched.
 *
 * @component
 * @returns {ReactElement} The rendered ProductList component.
 */
export const ProductList: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();

    // TODO: Figure out how to type this route.params.reload correctly...?
    // @ts-expect-error  this is hard to type correctly, cant find the correct type or interface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let reload: boolean = route.params?.reload ?? false;

    /**
     * Asynchronously fetches products from an API and updates the application context with the
     * fetched products. It manages the loading state by setting `isRefreshing` to true at the
     * start of the operation and back to false upon completion. If an error occurs during the
     * fetch operation, the error is logged to the console.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the products are loaded.
     */
    async function loadProducts(): Promise<void> {
        appContext.setIsRefreshing(true);

        try {
            appContext.setProducts(await getProducts());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Handles the refresh action for the product list.
     *
     * This function triggers the loading of products by calling the `loadProducts` function.
     * It is used as the `onRefresh` prop for the `FlatList` component to refresh the product list.
     *
     * @function
     * @returns {void}
     */
    const handleRefreshProducts: FunctionVoidType = (): void => {
        void loadProducts();
    };

    /**
     * Utilizes the `useFocusEffect` hook to reload products when the component is focused.
     * This effect is triggered if the products are not loaded or if the `reload` flag is true.
     * It calls the `loadProducts` function to fetch and update the products in the application context.
     * After fetching the products, it resets the `reload` flag to false to prevent unnecessary reloads
     * on subsequent focus events. It also updates the navigation parameters to reflect this change.
     *
     * @function
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.products || reload) {
                void loadProducts();
                reload = false;
                // @ts-expect-error  this is hard to type correctly, cant fint the correct type or interface
                navigation.setParams({ reload: false });
            }
        }, [appContext.products, reload, navigation.setParams]),
    );

    /**
     * Renders a single product item as a `Pressable` component. This function is used as the
     * `renderItem` prop for the `FlatList` component. It styles the item based on the press
     * state and navigates to the product specification view with the product details on press.
     *
     * @function
     * @param {ListRenderItemInfo<Product>} item - The product item to render.
     * @returns {ReactElement} The rendered product item component.
     */
    const renderItem: (item: ListRenderItemInfo<Product>) => ReactElement = ({
        item,
    }: ListRenderItemInfo<Product>): ReactElement => (
        <Pressable
            key={item.id}
            onPress={(): void => {
                navigation.dispatch(
                    CommonActions.navigate(NavPath.Products.ProductItem, {
                        item,
                    }),
                );
            }}
            style={({ pressed }: PressableStateCallbackType): ViewStyle[] => [
                Style.Button.listButton,
                {
                    backgroundColor: pressed
                        ? Style.Color.schemeOne.primary[200]
                        : Style.Button.listButton.backgroundColor,
                },
            ]}>
            <ProductListItem item={item} />
        </Pressable>
    );

    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'} />
    ) : (
        <FlatList
            data={appContext.products}
            keyExtractor={(item: Product): string => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing}
            onRefresh={handleRefreshProducts}
            style={Style.Container.flatList}
        />
    );
};
