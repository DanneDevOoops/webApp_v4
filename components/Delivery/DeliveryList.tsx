import React, { useCallback } from 'react';
import { useAppContext } from '../../context/App.provider';
import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { DeliveryListItem } from './DeliveryListItem';
import { LoadingIndicator } from '../Utils/LoadingIndicator';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import * as DeliveryModel from '../../models/Deliveries';
import * as ProductModel from '../../models/Products';
import { DeliveryListView } from './DeliveryListView';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import { RouteParams } from '../../types/Navigation';
import * as Style from '../../assets/styles';


export const DeliveryList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams>>();
    let reload: boolean | null = route.params?.reload ?? false;

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
            if (!appContext.deliveries || reload === true) {
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
    }): React.ReactElement => (
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
            style={({ pressed }): ViewStyle[] => [
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
