/**
 * @module screens/invoices/invoice-form-screen.tsx
 */

import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {
    CommonActions,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Button, Platform, Pressable, Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { LoadingIndicator } from 'components/utils/loading-indicator';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import * as InvoiceInterfaces from 'interfaces/invoice-interfaces';
import { Invoice, NewInvoice } from 'interfaces/invoice-interfaces';
import { Order } from 'interfaces/order-interfaces';
import * as InvoiceModel from 'models/invoices-models';
import * as OrderModel from 'models/orders-models';
import { RouteParams } from 'types/navigation-types';

export const InvoiceForm: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const navigation = useNavigation();
    const route: RouteProp<RouteParams> = useRoute<RouteProp<RouteParams>>();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(
        appContext.orders
            ? appContext.orders.filter((order: Order): boolean => {
                  return order.status_id === 500;
              })[0]
            : null,
    );
    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [showCreationDate, setShowCreationDate] = useState<boolean>(false);
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [showDueDate, setShowDueDate] = useState<boolean>(false);
    const [newInvoiceData, setNewInvoiceData] =
        useState<Partial<NewInvoice> | null>(null);

    /**
     * Calculate the due date for the invoice.
     */
    const getDueDate = (invoice_creation_date: Date = new Date()): Date => {
        return new Date(
            invoice_creation_date.setDate(invoice_creation_date.getDate() + 30),
        );
    };

    useEffect((): void => {
        console.log(`~> Route.name: ${route.name}`);

        if (!Array.isArray(appContext.orders) || !appContext.orders.length) {
            try {
                appContext.setIsRefreshing(true);
                void OrderModel.getOrders().then((orders: Order[]): void => {
                    appContext.setOrders(orders);
                });
            } catch (error) {
                console.error(error);
            } finally {
                appContext.setIsRefreshing(false);
            }
        }
    }, []);

    useEffect((): void => {
        if (selectedOrder) {
            const formatDate: (date: Date) => string = (date: Date): string => {
                return date.toISOString().split(', ')[0];
            };

            setNewInvoiceData({
                order_id: selectedOrder.id,
                total_price: OrderModel.calcOrderTotalPrice(selectedOrder),
                creation_date: formatDate(new Date()),
                due_date: formatDate(getDueDate()),
            });
        }
    }, [selectedOrder]);

    // Compute the packed orders from the appContext.orders.
    const packedOrders: Order[] = useMemo((): Order[] => {
        console.log('Memoizing packedOrders...');
        const currentlyPackedOrders: Order[] = appContext.orders
            ? appContext.orders.filter(
                  (order: Order): boolean => order.status_id === 200,
              )
            : [];

        if (
            Array.isArray(currentlyPackedOrders) &&
            currentlyPackedOrders.length > 0
        ) {
            // Set initial values of the selected order...
            setSelectedOrder(currentlyPackedOrders[0]);
        }

        return currentlyPackedOrders;
    }, [appContext.orders]);

    const handleSubmit = async (
        input_invoice: Partial<InvoiceInterfaces.NewInvoice>,
    ): Promise<void> => {
        try {
            console.log(
                `Route: ${route.name} ~> createInvoice(${input_invoice.order_id})`,
            );

            // Create the new invoice.
            await InvoiceModel.createInvoice(input_invoice).then(
                (createdInvoice: Invoice | void): void => {
                    console.info(
                        'RESPONSE NEW INVOICE: ',
                        createdInvoice,
                        ' from: ',
                        input_invoice,
                    );
                },
            );

            if (!!input_invoice.order_id && !!selectedOrder?.name) {
                // Update order status to invoiced.
                await OrderModel.updateOrderStatus(
                    input_invoice.order_id,
                    selectedOrder.name,
                    600,
                );
            }

            // Update the state of the appContext.orders & appContext.packedOrders.
            appContext.setOrders(await OrderModel.getOrders());

            navigation.dispatch(
                CommonActions.navigate(NavPath.Invoices.InvoicesList, {
                    screen: NavPath.Invoices.InvoicesList,
                    params: { reload: true },
                }),
            );
        } catch (error) {
            console.error(error);
        } finally {
            console.log('invoice created...', newInvoiceData);
            console.log('Navigating back to InvoicesList...');
            navigation.dispatch(
                CommonActions.navigate(NavPath.Invoices.InvoicesList, {
                    screen: NavPath.Invoices.InvoicesList,
                    params: { reload: true },
                }),
            );
        }
    };

    const creationDatePicker = (): ReactElement => {
        const showDatePicker = (): void => {
            setShowCreationDate(true);
        };

        return (
            <View style={Style.Container.row}>
                <Text
                    style={[
                        Style.Form.labelInputField,
                        {
                            width: '33%',
                            alignSelf: 'center',
                        },
                    ]}>
                    Fakturadatum
                </Text>

                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(showCreationDate || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(
                            event: DateTimePickerEvent,
                            date: Date | undefined,
                        ): void => {
                            if (date) {
                                setCreationDate(date);
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    creation_date:
                                        date?.toLocaleString() ||
                                        new Date().toLocaleString(),
                                });
                            }
                            setShowCreationDate(false);
                        }}
                        value={creationDate}
                    />
                )}
            </View>
        );
    };

    const dueDatePicker = (): ReactElement => {
        const showDatePicker = (): void => {
            setShowDueDate(true);
        };

        return (
            <View style={Style.Container.row}>
                <Text
                    style={[
                        Style.Form.labelInputField,
                        { width: '33%', alignSelf: 'center' },
                    ]}>
                    Förfallodatum
                </Text>

                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(showDueDate || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(
                            event: DateTimePickerEvent,
                            date: Date | undefined,
                        ): void => {
                            if (date) {
                                setDueDate(date);
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    due_date: date.toLocaleString(),
                                });
                            }
                            setShowDueDate(false);
                        }}
                        value={dueDate}
                    />
                )}
            </View>
        );
    };

    const invoiceOrderPicker = (): ReactElement => {
        return (
            <View>
                <Text style={Style.Typography.buttonText}>Välj Order</Text>
                <Picker
                    style={Style.Form.pickers}
                    selectedValue={selectedOrder?.id}
                    onValueChange={(
                        itemValue: number,
                        itemIndex: number,
                    ): void => {
                        const selectedOrder: Order = packedOrders[itemIndex];
                        setSelectedOrder(selectedOrder);
                        setNewInvoiceData({
                            ...newInvoiceData,
                            order_id: itemValue,
                            total_price:
                                OrderModel.calcOrderTotalPrice(selectedOrder),
                        });
                    }}>
                    {packedOrders.map((order: Order) => {
                        return (
                            <Picker.Item
                                key={order.id}
                                label={order.name}
                                value={order.id}
                            />
                        );
                    })}
                </Picker>
            </View>
        );
    };

    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Ordrar'} />
    ) : !appContext.isRefreshing && packedOrders.length ? (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid}>
                {creationDatePicker()}
                {dueDatePicker()}
                <Text style={Style.Container.row}>
                    Fakturabelopp: {newInvoiceData?.total_price} kr
                </Text>
            </View>

            <View style={Style.Container.content}>{invoiceOrderPicker()}</View>

            <Pressable
                style={({ pressed }) => [
                    Style.Button.buttonContainer,
                    {
                        backgroundColor: pressed
                            ? Style.Color.schemeOne.primary[200]
                            : Style.Color.schemeOne.primary[300],
                    },
                ]}
                onPress={(): void => {
                    if (newInvoiceData !== null) {
                        handleSubmit(newInvoiceData).catch((error): void => {
                            console.error('Error in handleSubmit: ', error);
                        });
                    }
                }}>
                <Text style={Style.Typography.buttonText}>Skapa Faktura</Text>
            </Pressable>

            <StatusBar style='auto' />
        </View>
    ) : !packedOrders.length ? (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.paragraph}>
                Det finns inga ordrar som är paketerade och redo att faktureras.
            </Text>
        </View>
    ) : (
        <View style={Style.Container.content}>
            <LoadingIndicator loadingType={'Ordrar'} />
        </View>
    );
};
