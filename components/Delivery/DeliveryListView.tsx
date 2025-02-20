import React, {useMemo} from 'react';
import {FlatList, Text, TextStyle, View, ViewStyle} from 'react-native';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import {DeliveryListViewProps} from '../../interfaces/Delivery';
import * as Style from '../../assets/styles';


/**
 * DeliveryListView component.
 *
 * This component is responsible for rendering a list of deliveries. It uses a FlatList to
 * display the deliveries and provides a refresh mechanism.
 *
 * @component
 * @param {DeliveryListViewProps} props - The properties for the DeliveryListView component.
 * @param {DeliveriesInterfaces.Delivery[]} props.deliveries - The list of deliveries to be
 *      displayed.
 * @param {boolean} props.isRefreshing - A boolean indicating whether the list is currently
 * being refreshed.
 * @param {() => void} props.onRefresh - A callback function to be called when the list needs
 * to be refreshed.
 * @param {(item: DeliveriesInterfaces.Delivery) => React.ReactElement} props.renderItem -
 *      A function to render each delivery item.
 * @returns {React.ReactElement} The rendered DeliveryListView component.
 */
export const DeliveryListView: React.FC<DeliveryListViewProps> = ({
    deliveries,
    isRefreshing,
    onRefresh,
    renderItem,
}: DeliveryListViewProps): React.ReactElement => {
    return useMemo((): React.ReactElement => {
        if (!deliveries) {
            return (
                <View style={Style.Container.warningMsgContainer as ViewStyle}>
                    <Text style={Style.Typography.warningFlashMsg as TextStyle}>
                        Det finns inte några inleveranser...
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={deliveries}
                    keyExtractor={(item: DeliveriesInterfaces.Delivery) =>
                        item.id.toString()
                    }
                    renderItem={renderItem}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            );
        }
    }, [deliveries, isRefreshing]);
};
