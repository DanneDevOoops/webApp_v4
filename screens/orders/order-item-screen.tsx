/**
 * @module OrderItem
 *
 * This module provides a detailed view of a specific order. It includes information about the
 * order such as order ID, status, customer name, address, postal code, and city. It also
 * displays a map with markers for the user's current location and the order location if
 * available. The module allows the user to pack the order, send the order, or shows relevant
 * status messages based on the order status.
 */
import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Pressable,
    PressableStateCallbackType,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import * as Style from 'assets/styles';
import { flash_message } from 'assets/utils/animation';
import * as APP_CONFIG from 'config/config.json';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import * as OrderInterfaces from 'interfaces/order-interfaces';
import {
    Order,
    OrderItemProps,
    OrderItemType,
} from 'interfaces/order-interfaces';
import { Product } from 'interfaces/product-interfaces';
import * as NominatimModel from 'models/nominatim-models';
import * as OrderModel from 'models/orders-models';
import * as ProductModel from 'models/products-models';
import { RouteParams } from 'types/navigation-types';

/**
 * OrderItemType screen/view.
 *
 * This component displays a detailed view of a specific order. It includes information about
 * the order such as order ID, status, customer name, address, postal code, and city. It also
 * displays a map with markers for the user's current location and the order location if
 * available. The component allows the user to pack the order, send the order, or shows relevant
 * status messages based on the order status.
 *
 * @param {OrderItemProps} props - The properties for the OrderItemType component.
 * @returns {ReactElement} The OrderItemType component.
 */
export const OrderItem: React.FC<OrderItemProps> = (props: OrderItemProps) => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams>>();
    const [errorMessage, setErrorMessage] = useState(null);
    const [orderLocationMarker, setOrderLocationMarker] = useState<ReactElement<
        typeof Marker
    > | null>(null);
    const [orderCoordinates, setOrderCoordinates] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [userPositionMarker, setUserPositionMarker] =
        useState<ReactElement | null>(null);
    const mapRef = useRef<MapView>(null);
    const order: Order | undefined = props.route?.params.item;

    // TODO: Figure out how to type this route.params.reload correctly...?
    // @ts-expect-error  this is hard to type correctly, cant find the correct type or interface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const reload: boolean = route.params?.reload ?? false;
    // let reload: boolean = route.params?.reload ?? false;

    /**
     * Fetches the current user location and the order location, then sets the respective
     * markers on the map.
     *
     * This function requests permission to access the user's location. If granted, it
     * retrieves the current location coordinates and sets the user position in the application
     * contexts. It also fetches the coordinates for the order address using the Nominatim model
     * and sets the order location marker on the map. If the order address is not found, the
     * order location marker is set to null. Additionally, it sets the user location marker on
     * the map.
     *
     * @returns {Promise<void>} A promise that resolves when the data fetching and marker
     * setting are complete.
     */
    const fetchData = async (): Promise<void> => {
        try {
            const permission: Location.LocationPermissionResponse =
                await Location.requestForegroundPermissionsAsync();

            if (permission.status !== Location.PermissionStatus.GRANTED) {
                // @ts-expect-error  this is a string, but the type expects a LocationPermissionResponse
                setErrorMessage('Permission to access location was denied');

                console.info(errorMessage);
                return;
            }

            const location: LocationObject =
                await Location.getCurrentPositionAsync({});

            if (location) {
                appContext.setUserPosition({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                });

                setUserPositionMarker(
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title='Min position'
                        pinColor={Style.Color.indicator.info[300] as string}
                    />,
                );
            } else {
                setUserPositionMarker(null);
            }

            if (order) {
                const response = await NominatimModel.getCoordinates(
                    order.address,
                );
                console.info('2. getCoordinates Response: ', response);

                if (
                    order &&
                    response &&
                    response.length > 0 &&
                    response[0].lat &&
                    response[0].lon
                ) {
                    const latitude = parseFloat(response[0].lat);
                    const longitude = parseFloat(response[0].lon);
                    const pinColor = (): string =>
                        order.status_id === 200
                            ? (Style.Color.indicator.warning[300] as string)
                            : order.status_id === 400
                              ? (Style.Color.indicator.positive[300] as string)
                              : (Style.Color.indicator.info[300] as string);

                    setOrderCoordinates({ latitude, longitude });

                    setOrderLocationMarker(
                        <Marker
                            coordinate={{ latitude, longitude }}
                            title={order.name + ' position'}
                            pinColor={pinColor()}
                        />,
                    );
                } else {
                    setOrderLocationMarker(null);
                    setOrderCoordinates(null);
                }
            }
        } catch (error) {
            console.error('Error: ', error);

            flash_message(
                'danger',
                `Något gick fel vid hämtning av data\n${error as string}`,
            );
        }
    };

    const handleOrderStatusUpdate = (): void => {
        if (order) {
            OrderModel.updateOrderStatus(order.id, order.name, 400)
                .then((): void => {
                    showMessage({
                        message: `Order (${order.id}) har skickats`,
                        description: 'order har skickats.',
                        type: 'success',
                        duration: 3500,
                    });

                    navigation.dispatch(
                        CommonActions.navigate(NavPath.Orders.OrdersScreen, {
                            screen: NavPath.Orders.OrdersList,
                            params: { reload: true },
                        }),
                    );
                })
                .catch((error): void => {
                    console.error('Error sending order: ', error);
                });
        }
    };

    const pickOrder = async (): Promise<void> => {
        if (order) {
            try {
                await OrderModel.pickOrder(order);
                const updatedProductsList: Product[] =
                    await ProductModel.getProducts();
                const updatedOrdersList: Order[] = await OrderModel.getOrders();

                // Update the state of things...
                appContext.setProducts(updatedProductsList);
                appContext.setOrders(updatedOrdersList);
                flash_message('success', 'order har paketerats');
            } catch (error) {
                console.error('Error picking order: ', error);
                flash_message('warning', 'order gick inte att paketera');
            } finally {
                navigation.dispatch(
                    CommonActions.navigate(NavPath.Orders.OrdersScreen, {
                        screen: NavPath.Orders.OrdersList,
                        params: { reload: true },
                    }),
                );
                // navigation.navigate('Orderlista', { reload: true });
            }
        }
    };

    const handlePickOrder = (): void => {
        void pickOrder();
    };

    /**
     * Hook to handle focus effect for fetching user and order locations.
     *
     * This hook uses `useFocusEffect` to trigger the `fetchData` function when the screen
     * comes into focus. It checks if the user position is not set or if a reload is required.
     * If either condition is true, it calls the `fetchData` function to update the user and
     * order locations. After fetching the data, it resets the reload parameter to false.
     *
     * Dependencies:
     * - `appContext.userPosition`: The current user position from the application contexts.
     * - `reload`: A boolean indicating if a reload is required.
     * - `navigation.setParams`: Function to update the navigation parameters.
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.userPosition || reload) {
                void fetchData();
                // @ts-expect-error  Something to do with the type of setParam reload...
                navigation.setParams({ reload: false });
            }
        }, [appContext.userPosition, reload, navigation.setParams]),
    );

    /**
     * Hook to fit map view to user and order locations.
     *
     * This hook is executed after the component renders and whenever the user or order
     * location markers change. It checks if the map reference, user position marker, and order
     * location marker are available. If they are, it adjusts the map view to fit the
     * coordinates of the user and order locations with appropriate padding.
     */
    // useEffect((): void => {
    //     if (mapRef.current && userPositionMarker && orderLocationMarker) {
    //         // @ts-expect-error  Some sort of type error due to nested attributes here...
    //         const userLatitude: number = appContext.userPosition.latitude;
    //         // @ts-expect-error  Some sort of type error due to nested attributes here...
    //         const userLongitude: number = appContext.userPosition.longitude;
    //         const orderLatitude: number = parseFloat(
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //             orderLocationMarker.props.coordinate.latitude as string,
    //         );
    //         const orderLongitude: number = parseFloat(
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //             orderLocationMarker.props.coordinate.longitude as string,
    //         );
    //
    //         if (!isNaN(orderLatitude) && !isNaN(orderLongitude)) {
    //             mapRef.current.fitToCoordinates(
    //                 [
    //                     {
    //                         latitude: userLatitude,
    //                         longitude: userLongitude,
    //                     },
    //                     {
    //                         latitude: orderLatitude,
    //                         longitude: orderLongitude,
    //                     },
    //                 ],
    //                 {
    //                     edgePadding: {
    //                         top: 50,
    //                         right: 50,
    //                         bottom: 50,
    //                         left: 50,
    //                     },
    //                     animated: true,
    //                 },
    //             );
    //         }
    //     }
    // }, [userPositionMarker, orderLocationMarker]);

    useEffect((): void => {
        if (
            mapRef.current &&
            userPositionMarker &&
            orderCoordinates &&
            appContext.userPosition
        ) {
            const userLatitude: number = appContext.userPosition.latitude;
            const userLongitude: number = appContext.userPosition.longitude;
            const orderLatitude: number = orderCoordinates.latitude;
            const orderLongitude: number = orderCoordinates.longitude;

            if (!isNaN(orderLatitude) && !isNaN(orderLongitude)) {
                mapRef.current.fitToCoordinates(
                    [
                        {
                            latitude: userLatitude,
                            longitude: userLongitude,
                        },
                        {
                            latitude: orderLatitude,
                            longitude: orderLongitude,
                        },
                    ],
                    {
                        edgePadding: {
                            top: 50,
                            right: 50,
                            bottom: 50,
                            left: 50,
                        },
                        animated: true,
                    },
                );
            }
        }
    }, [userPositionMarker, orderCoordinates]);

    /**
     * Compute boolean value to indicate if order is packable.
     *
     * This memoized value determines if the order is packable based on the order status and
     * stock levels. It checks if the order status is 100, the order has items, and every item
     * in the order has sufficient stock.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     * - `order.order_items`: The list of items in the order.
     *
     * @returns {boolean} True if the order is packable, false otherwise.
     */
    const orderIsPackable: boolean = useMemo(
        (): boolean =>
            !!order &&
            order.status_id === 100 &&
            order.order_items.length > 0 &&
            order.order_items.every((orderItem: OrderItemType): boolean => {
                return orderItem.stock >= orderItem.amount;
            }),
        [order?.status_id, order?.order_items],
    );

    /**
     * Compute boolean value to indicate if order is missing items.
     *
     * This memoized value determines if the order is missing items based on the order status
     * and the number of items. It checks if the order status is 100 and the order has no items.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     * - `order.order_items.length`: The number of items in the order.
     *
     * @returns {boolean} True if the order is missing items, false otherwise.
     */
    const orderIsMissingItems: boolean = useMemo(
        (): boolean =>
            !!order &&
            order.status_id === 100 &&
            order.order_items.length === 0,
        [order?.status_id, order?.order_items.length],
    );

    /**
     * Compute boolean value to indicate if order is packed.
     *
     * This memoized value determines if the order is packed based on the order status.
     * It checks if the order status is 200.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is packed, false otherwise.
     */
    const orderIsPacked: boolean = useMemo(
        (): boolean => !!order && order.status_id === 200,
        [order?.status_id],
    );

    /**
     * Compute boolean value to indicate if order is sent to customer.
     *
     * This memoized value determines if the order is sent based on the order status.
     * It checks if the order status is either 400 or 600.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is sent, false otherwise.
     */
    const orderIsSent: boolean = useMemo(
        (): boolean => !!order && [400, 600].includes(order.status_id),
        [order?.status_id],
    );

    /**
     * Compute boolean value to indicate if order is returned.
     *
     * This memoized value determines if the order is returned based on the order status.
     * It checks if the order status is 800.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is returned, false otherwise.
     */
    const orderIsReturned: boolean = useMemo(
        (): boolean => !!order && order.status_id === 800,
        [order?.status_id],
    );

    /**
     * Compute boolean value to indicate if order is refunded.
     *
     * This memoized value determines if the order is refunded based on the order status.
     * It checks if the order status is 900.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is refunded, false otherwise.
     */
    const orderIsRefunded: boolean = useMemo(
        (): boolean => !!order && order.status_id === 900,
        [order?.status_id],
    );

    /**
     * Compute dynamic interaction element based on order status.
     *
     * This memoized value determines the appropriate interaction element to display based on
     * the order status and stock levels. It returns different elements for various order
     * statuses, such as packable, packed, sent, returned, and refunded. The element displayed
     * allows the user to pack the order, send the order, or shows relevant status messages.
     *
     * Dependencies:
     * - `orderIsPackable`: Boolean indicating if the order is packable.
     * - `orderIsPacked`: Boolean indicating if the order is packed.
     * - `orderIsSent`: Boolean indicating if the order is sent.
     * - `orderIsReturned`: Boolean indicating if the order is returned.
     * - `orderIsRefunded`: Boolean indicating if the order is refunded.
     * - `orderIsMissingItems`: Boolean indicating if the order is missing items.
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {ReactElement} The interaction element to display based on the order status.
     */
    const dynamicInteractionElement: ReactElement =
        useMemo((): ReactElement => {
            if (orderIsPackable) {
                return (
                    <Pressable
                        style={({ pressed }: PressableStateCallbackType) => [
                            Style.Button.buttonContainer,
                            {
                                backgroundColor: pressed
                                    ? Style.Color.schemeOne.primary[200]
                                    : Style.Color.schemeOne.primary[300],
                            },
                        ]}
                        onPress={handlePickOrder}>
                        <Text style={Style.Typography.buttonText}>
                            Packetera Order
                        </Text>
                    </Pressable>
                );
            } else if (orderIsPacked) {
                return (
                    <View>
                        <Pressable
                            style={({
                                pressed,
                            }: PressableStateCallbackType) => [
                                Style.Button.buttonContainer,
                                {
                                    backgroundColor: pressed
                                        ? Style.Color.schemeOne.primary[200]
                                        : Style.Color.schemeOne.primary[300],
                                },
                            ]}
                            onPress={handleOrderStatusUpdate}>
                            <Text style={Style.Typography.buttonText}>
                                Skicka Order
                            </Text>
                        </Pressable>

                        <View style={Style.Container.infoMsgContainer}>
                            <Text style={Style.Typography.infoFlashMsg}>
                                Ordern är packeterad
                            </Text>
                        </View>
                    </View>
                );
            } else if (orderIsSent) {
                return (
                    <View style={Style.Container.successMsgContainer}>
                        <Text style={Style.Typography.successFlashMsg}>
                            Ordern har skickats till kund
                        </Text>
                    </View>
                );
            } else if (orderIsReturned) {
                return (
                    <View style={Style.Container.infoMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Kunden har returnerat ordern.
                        </Text>
                    </View>
                );
            } else if (orderIsRefunded) {
                return (
                    <View style={Style.Container.infoMsgContainer}>
                        <Text style={Style.Typography.infoFlashMsg}>
                            Ordern är återbetald.
                        </Text>
                    </View>
                );
            } else if (!orderIsPackable && !orderIsMissingItems) {
                return (
                    <View style={Style.Container.warningMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Ordern går inte att packetera pga lagersaldo för
                            en/flera av beställda produkter saknas.
                        </Text>
                    </View>
                );
            } else if (orderIsMissingItems) {
                return (
                    <View style={Style.Container.warningMsgContainer}>
                        <Text style={Style.Typography.cautionFlashMsg}>
                            Order saknar produkter.
                        </Text>
                    </View>
                );
            } else {
                return (
                    <View style={Style.Container.warningMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Det är något gick fel på orderns status. Kontakta
                            support!
                        </Text>
                    </View>
                );
            }
        }, [order?.status_id]);

    /**
     * Compute and render order details.
     *
     * This memoized value returns a React element that displays the details of an order,
     * including the order ID, status, customer name, address, postal code, and city. It also
     * includes a dynamic interaction element based on the order status.
     *
     * Dependencies:
     * - `order`: The order object containing details such as ID, status, customer name,
     *      address, postal code, and city.
     * - `dynamicInteractionElement`: The interaction element to display based on the order status.
     *
     * @returns {ReactElement} The React element displaying the order details and dynamic
     *      interaction element.
     */
    const orderDetails = useMemo((): ReactElement => {
        return (
            <View style={Style.Container.content}>
                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Order ID: </Text>
                    <Text style={Style.Typography.dataRight}>{order?.id}</Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Status: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order?.status}
                    </Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Status kod: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order?.status_id}
                    </Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Kund: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order?.name}
                    </Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Address: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order?.address}
                    </Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Postkod: </Text>
                    <Text style={Style.Typography.dataRight}>{order?.zip}</Text>
                </View>

                <View style={Style.Container.row}>
                    <Text style={Style.Typography.dataLeft}>Stad: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order?.city}
                    </Text>
                </View>

                {dynamicInteractionElement}
            </View>
        );
    }, [order, dynamicInteractionElement]);

    const orderDirectionsPath = useMemo((): ReactElement | null => {
        if (
            appContext.userPosition?.latitude &&
            appContext.userPosition?.longitude &&
            orderLocationMarker
        ) {
            // @ts-expect-error  property 'coordinate' does not exist on type 'PropsWithChildren<MarkerProps>'
            const coordinate = orderLocationMarker.props.coordinate as {
                latitude: number;
                longitude: number;
            };

            return (
                <MapViewDirections
                    origin={appContext.userPosition}
                    destination={coordinate}
                    apikey={APP_CONFIG.google_directions_api_key}
                    strokeWidth={3}
                    strokeColor={Style.Color.indicator.positive[100] as string}
                />
            );
        } else {
            return null;
        }
    }, [appContext.userPosition, orderLocationMarker]);

    /**
     * Compute and render map element based on user and order locations.
     *
     * This memoized value returns a React element that displays a map centered around the
     * user's position. It includes markers for the user's current location and the order
     * location if available.
     *
     * Dependencies:
     * - `appContext.userPosition`: The current user position from the application contexts.
     * - `userPositionMarker`: The marker element for the user's position.
     * - `orderLocationMarker`: The marker element for the order location.
     *
     * @returns {ReactElement | null} The React element displaying the map with markers, or null if
     *      the user position is not available.
     */
    const mapElement: ReactElement | null = useMemo(() => {
        if (
            !appContext.userPosition?.latitude ||
            !appContext.userPosition?.longitude
        ) {
            return null;
        }

        return (
            <View style={Style.Container.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={Style.Container.map}
                    initialRegion={{
                        // center around your position
                        latitude: appContext.userPosition?.latitude,
                        longitude: appContext.userPosition?.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    mapType={'hybrid'}>
                    {orderDirectionsPath}
                    {userPositionMarker}
                    {orderLocationMarker}
                </MapView>
            </View>
        );
    }, [appContext.userPosition, userPositionMarker, orderLocationMarker]);

    const orderListItems: ReactElement[] = order
        ? order.order_items.map(
              (
                  orderListItem: OrderInterfaces.OrderItemType,
                  index: number,
              ): ReactElement => (
                  <View key={index}>
                      <View style={Style.Container.grid}>
                          <View style={Style.Container.row}>
                              <View style={Style.Container.gridCol[1]}>
                                  <Text>{index + 1}. </Text>
                              </View>

                              <View style={Style.Container.gridCol[7]}>
                                  <View style={Style.Container.row}>
                                      {/* Item article number */}
                                      <Text style={Style.Typography.dataLeft}>
                                          {orderListItem.name}
                                      </Text>

                                      {/* Item name */}
                                      <Text style={Style.Typography.dataCenter}>
                                          {orderListItem.article_number}
                                      </Text>

                                      {/* Item amount */}
                                      <Text style={Style.Typography.dataRight}>
                                          {orderListItem.amount} st.
                                      </Text>
                                  </View>
                              </View>
                          </View>

                          <View style={Style.Container.row}>
                              <View style={Style.Container.gridCol[1]}>
                                  <Text> </Text>
                              </View>

                              <View style={Style.Container.gridCol[7]}>
                                  <View style={Style.Container.row}>
                                      {/* Item article number */}
                                      <Text style={Style.Typography.dataLeft}>
                                          Lagerplats:
                                      </Text>

                                      {/* Item name */}
                                      <Text style={Style.Typography.dataCenter}>
                                          {orderListItem.location}
                                      </Text>

                                      {/* Item amount */}
                                      <Text style={Style.Typography.dataRight}>
                                          {orderListItem.stock} st.
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      </View>

                      {order && order.status_id === 100 ? (
                          <View
                              style={[
                                  Style.Container.row,
                                  {
                                      paddingVertical:
                                          Style.Typography.whiteSpace[75],
                                      marginBottom:
                                          index < order.order_items.length - 1
                                              ? Style.Typography.whiteSpace[100]
                                              : Style.Typography.whiteSpace[50],
                                      borderBottomColor:
                                          index < order.order_items.length - 1
                                              ? Style.Color.grayScale[200]
                                              : '',
                                      borderBottomWidth:
                                          index < order.order_items.length - 1
                                              ? 0.3
                                              : 0,
                                  },
                              ]}></View>
                      ) : order ? (
                          <View
                              style={[
                                  Style.Container.row,
                                  {
                                      borderBottomColor:
                                          index < order.order_items.length - 1
                                              ? Style.Color.grayScale[200]
                                              : '',
                                      borderBottomWidth:
                                          index < order.order_items.length - 1
                                              ? 0.3
                                              : 0,
                                  },
                              ]}></View>
                      ) : null}
                  </View>
              ),
          )
        : [];

    if (order) {
        const shouldShowMapElement = [200, 400].includes(order.status_id);

        return (
            <View style={Style.Container.content}>
                <ScrollView style={Style.Container.scrollView}>
                    {orderDetails}

                    {shouldShowMapElement && mapElement}

                    {orderListItems}
                </ScrollView>
                <StatusBar style='auto' />
            </View>
        );
    }
};
