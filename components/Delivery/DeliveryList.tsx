import React, { useCallback } from 'react';
import { useAppContext } from '../../context/App.provider';
import {
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
import * as Style from '../../assets/styles';
import { DeliveryListView } from './DeliveryListView';
import { RouteParams } from '../../types/Utils';

export const DeliveryList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute<RouteParams>();
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
                    // Reset the reload parameter to false after loading deliveries
                    navigation.setParams({ reload: false });
                });
            }
        }, [appContext.deliveries, reload, navigation.setParams]),
    );

    const renderItem = ({
        item,
    }: {
        item: DeliveriesInterfaces.Delivery;
    }): React.ReactElement => (
        <Pressable
            key={item.id}
            onPress={(): void => {
                navigation.navigate('Inleveransspecifikation', { item });
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
                    navigation.navigate('Inleverasformulär');
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
                    navigation.navigate('Inleverasformulär');
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
