/**
 * @module components/deliverydelivery-list-view.tsx
 *
 * This module defines the list view component for displaying a list of deliveries.
 * It uses a FlatList to render the deliveries and provides a refresh mechanism.
 */

import React, { ReactElement, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import * as Style from 'assets/styles';
import * as DeliveriesInterfaces from 'interfaces/delivery-interfaces';
import { DeliveryListViewProps } from 'interfaces/delivery-interfaces';

/**
 * DeliveryListView component.
 *
 * This component is responsible for rendering a list of deliveries. It uses a FlatList to
 * display the deliveries and provides a refresh mechanism.
 *
 * @function
 * @param {DeliveryListViewProps} props - The properties for the DeliveryListView component.
 * @returns {ReactElement} The rendered DeliveryListView component.
 */
export const DeliveryListView: React.FC<DeliveryListViewProps> = ({
    deliveries,
    isRefreshing,
    onRefresh,
    renderItem,
}: DeliveryListViewProps): ReactElement => {
    return useMemo((): ReactElement => {
        if (!deliveries) {
            return (
                <View style={Style.Container.warningMsgContainer}>
                    <Text style={Style.Typography.warningFlashMsg}>
                        Det finns inte några inleveranser...
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={deliveries}
                    keyExtractor={(
                        item: DeliveriesInterfaces.Delivery,
                    ): string => item.id.toString()}
                    renderItem={renderItem}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            );
        }
    }, [deliveries, isRefreshing]);
};
