import React, { ReactElement, useCallback } from 'react';
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
import { useAppContext } from '../../context/app-provider';
import { LoadingIndicator } from '../utils/loading-indicator';
import { getProducts } from '../../models/products-models';
import { ProductListItem } from './product-list-item';
import { NavigationPathKeys as NavPath } from '../../constants/navigation-constants';
import { RouteParams } from '../../types/navigation-types';
import { AppContextType } from '../../interfaces/app-interfaces';
import { Product } from '../../interfaces/product-interfaces';
import * as Style from '../../assets/styles';
import { FunctionVoidType } from '../../types/utils-types';

/**
 * `ProductList` is a functional component that displays a list of products fetched from an API.
 * It utilizes the `useFocusEffect` hook from `@react-navigation/native` to reload products
 * when the component is focused and the `reload` parameter is true. products are displayed
 * using a `FlatList` component from `react-native`. Each product item is rendered as a `Pressable`
 * component, which navigates to a product specification view on press.
 *
 * The component also handles loading states and displays a `LoadingIndicator` component while
 * products are being fetched.
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
