/**
 * @module delivery-list.tsx
 *
 * This module defines the list component for displaying and managing deliveries.
 * It handles loading, refreshing, and navigating to delivery details and forms.
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
    Pressable,
    PressableStateCallbackType,
    Text,
    View,
    ViewStyle,
} from 'react-native';

import { DeliveryListItem } from './delivery-list-item';
import { DeliveryListView } from './delivery-list-view';
import * as Style from 'assets/styles';
import { LoadingIndicator } from 'components/utils/loading-indicator';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import * as DeliveriesInterfaces from 'interfaces/delivery-interfaces';
import * as DeliveryModel from 'models/deliveries-models';
import * as ProductModel from 'models/products-models';
import { RouteParams } from 'types/navigation-types';

/**
 * DeliveryList component.
 *
 * This component is responsible for displaying and managing a list of deliveries.
 * It handles loading deliveries, refreshing the list, and navigating to delivery details
 * and forms.
 *
 * @component
 * @returns {ReactElement} The rendered DeliveryList component.
 */
export const DeliveryList: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();

    // TODO: Figure out how to type this route.params.reload correctly...?
    // @ts-expect-error  this is hard to type correctly, cant find the correct type or interface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let reload: boolean = route.params?.reload ?? false;

    /**
     * Loads the deliveries and products from the server and updates the app context.
     *
     * @async
     * @function loadDeliveries
     * @returns {Promise<void>} A promise that resolves when the deliveries and products are
     * loaded.
     */
    async function loadDeliveries(): Promise<void> {
        appContext.setIsRefreshing(true);

        try {
            appContext.setDeliveries(await DeliveryModel.getDeliveries());
            appContext.setProducts(await ProductModel.getProducts());
        } catch (error) {
            console.warn(error);
        } finally {
            reload = false;
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Handles refreshing the deliveries list.
     *
     * @function handleRefreshDeliveries
     * @returns {void}
     */
    const handleRefreshDeliveries = (): void => {
        loadDeliveries().catch((error: Error): void => {
            console.error(error);
        });
    };

    /**
     * Focus effect to load deliveries when the screen is focused or when reload is true.
     *
     * This effect is triggered when the screen gains focus. It checks if the deliveries
     * are not loaded or if a reload is required, and then loads the deliveries. After
     * loading, it resets the reload parameter to false.
     *
     * @function useFocusEffect
     * @param {Function} useCallback - The callback function to be executed when the screen is
     * focused.
     * @returns {void}
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.deliveries || reload) {
                void loadDeliveries().then((): void => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    // Reset the reload parameter to false after loading deliveries
                    return navigation.setParams({ reload: false });
                });
            }
        }, [appContext.deliveries, reload, navigation]),
    );

    /**
     * Renders a delivery item.
     *
     * @function renderItem
     * @param {Object} param0 - The parameter object.
     * @param {DeliveriesInterfaces.Delivery} param0.item - The delivery item to be rendered.
     * @returns {ReactElement} The rendered delivery item.
     */
    const renderItem = ({
        item,
    }: {
        item: DeliveriesInterfaces.Delivery;
    }): ReactElement => (
        <Pressable
            key={item.id}
            onPress={(): void => {
                // Navigate to DeliverySpecification screen with item as param.
                navigation.dispatch(
                    CommonActions.navigate(NavPath.Delivery.DeliveriesScreen, {
                        screen: NavPath.Delivery.DeliverySpecification,
                        params: { item },
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
            <DeliveryListItem item={item} />
        </Pressable>
    );

    return appContext.isRefreshing ? (
        <View style={Style.Container.content}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer}
                onPress={(): void => {
                    // Navigate to DeliveryForm screen.
                    navigation.dispatch(
                        CommonActions.navigate(
                            NavPath.Delivery.DeliveriesScreen,
                            {
                                screen: NavPath.Delivery.DeliveryForm,
                            },
                        ),
                    );
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            <LoadingIndicator loadingType={'Leveranser'} />
        </View>
    ) : (
        <View style={Style.Container.content}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer}
                onPress={(): void => {
                    // Navigate to DeliveryForm screen.
                    navigation.dispatch(
                        CommonActions.navigate(
                            NavPath.Delivery.DeliveriesScreen,
                            {
                                screen: NavPath.Delivery.DeliveryForm,
                            },
                        ),
                    );
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            <DeliveryListView
                deliveries={appContext.deliveries}
                isRefreshing={appContext.isRefreshing}
                onRefresh={handleRefreshDeliveries}
                renderItem={renderItem}
            />
        </View>
    );
};
