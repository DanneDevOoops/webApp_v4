import React, { FC, ReactElement, useCallback } from 'react';
import { useAppContext } from '../../context/App.provider';
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
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { DeliveryListItem } from './DeliveryListItem';
import { LoadingIndicator } from '../Utils/LoadingIndicator';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import * as DeliveryModel from '../../models/Deliveries';
import * as ProductModel from '../../models/Products';
import { DeliveryListView } from './DeliveryListView';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import { AppContext } from '../../interfaces/AppContext';
import { RouteParams } from '../../types/Navigation';
import * as Style from '../../assets/styles';

export const DeliveryList: FC = (): ReactElement => {
    const appContext: AppContext = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();
    // @ts-expect-error  this is hard to type correctly, cant fint the correct type or interface
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
                Style.Button.listButton as ViewStyle,
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
        <View style={Style.Container.content as ViewStyle}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer as ViewStyle}
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
                <Text style={Style.Typography.buttonText as TextStyle}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            <LoadingIndicator loadingType={'Leveranser'} />
        </View>
    ) : (
        <View style={Style.Container.content as ViewStyle}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer as ViewStyle}
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
                <Text style={Style.Typography.buttonText as TextStyle}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            <DeliveryListView
                deliveries={appContext.deliveries}
                isRefreshing={appContext.isRefreshing}
                onRefresh={loadDeliveries}
                renderItem={renderItem}
            />
        </View>
    );
};
