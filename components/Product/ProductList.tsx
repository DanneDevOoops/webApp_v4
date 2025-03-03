import React, { FC, ReactElement, useCallback } from 'react';
import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import {
    FlatList,
    ListRenderItemInfo,
    Pressable,
    PressableStateCallbackType,
    ViewStyle,
} from 'react-native';
import { useAppContext } from '../../context/App.provider';
import { LoadingIndicator } from '../Utils/LoadingIndicator';
import { getProducts } from '../../models/Products';
import { ProductListItem } from './ProductListItem';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import { RouteParams } from '../../types/Navigation';
import { AppContext } from '../../interfaces/AppContext';
import { Product } from '../../interfaces/Product';
import * as Style from '../../assets/styles';

/**
 * `ProductList` is a functional component that displays a list of products fetched from an API.
 * It utilizes the `useFocusEffect` hook from `@react-navigation/native` to reload products
 * when the component is focused and the `reload` parameter is true. Products are displayed
 * using a `FlatList` component from `react-native`. Each product item is rendered as a `Pressable`
 * component, which navigates to a product specification view on press.
 *
 * The component also handles loading states and displays a `LoadingIndicator` component while
 * products are being fetched.
 */
export const ProductList: FC = (): ReactElement => {
    const appContext: AppContext = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();
    // @ts-expect-error  this is hard to type correctly, cant fint the correct type or interface
    let reload: boolean = route.params?.reload ?? false;

    /**
     * Asynchronously fetches products from an API and updates the application context with the fetched
     * products. It manages the loading state by setting `isRefreshing` to true at the start of the
     * operation and back to false upon completion. If an error occurs during the fetch operation, the
     * error is logged to the console.
     *
     * This function is crucial for ensuring that the application's context holds the latest products data,
     * allowing for a dynamic and responsive user interface.
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
     * Utilizes the `useFocusEffect` hook to reload products when the component is focused.
     * This effect is triggered if the products are not loaded or if the `reload` flag is true.
     * It calls the `loadProducts` function to fetch and update the products in the application context.
     * After fetching the products, it resets the `reload` flag to false to prevent unnecessary reloads
     * on subsequent focus events. It also updates the navigation parameters to reflect this change.
     *
     * The effect is dependent on the `appContext.products`, `reload` flag, and the
     * `navigation.setParams` method, meaning it will re-run only when any of these dependencies change.
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
     * @param {Product} item - The product item to render.
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
                Style.Button.listButton as ViewStyle,
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
            onRefresh={loadProducts}
            style={Style.Container.flatList}
        />
    );
};
