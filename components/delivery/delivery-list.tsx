import React, { ReactElement, useCallback } from 'react';
import { useAppContext } from '../../context/app-provider';
import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import {
    Pressable,
    PressableStateCallbackType,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import { DeliveryListItem } from './delivery-list-item';
import { LoadingIndicator } from '../utils/loading-indicator';
import * as DeliveriesInterfaces from '../../interfaces/delivery-interfaces';
import * as DeliveryModel from '../../models/deliveries-models';
import * as ProductModel from '../../models/products-models';
import { DeliveryListView } from './delivery-list-view';
import { NavigationPathKeys as NavPath } from '../../constants/navigation-constants';
import { AppContextType } from '../../interfaces/app-interfaces';
import { RouteParams } from '../../types/navigation-types';
import * as Style from '../../assets/styles';

export const DeliveryList: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();

    // TODO: Figure out how to type this route.params.reload correctly...?
    // @ts-expect-error  this is hard to type correctly, cant find the correct type or interface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let reload: boolean = route.params?.reload ?? false;

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

    const handleRefreshDeliveries = (): void => {
        loadDeliveries().catch((error: Error): void => {
            console.error(error);
        });
    };

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
