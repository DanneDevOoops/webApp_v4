/**
 * @module invoice-data-table.tsx
 *
 * This module defines the InvoiceDataTable component for rendering a table of invoices.
 * It integrates with the application's contexts to fetch and display invoice data, leveraging
 * React Navigation for navigation and using focus effects to reload data as needed.
 */

import {
    CommonActions,
    RouteProp,
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import React, { ReactElement, useCallback, useMemo } from 'react';
import {
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { DataTable } from 'react-native-paper';

import * as Style from 'assets/styles';
import { LoadingIndicator } from 'components/utils/loading-indicator';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { useAuthContext } from 'contexts/auth-provider';
import { Invoice } from 'interfaces/invoice-interfaces';
import { getInvoices } from 'models/invoices-models';
import { RouteParams } from 'types/navigation-types';
import { FunctionVoidType } from 'types/utils-types';

/**
 * InvoiceDataTable component.
 *
 * This component displays a table of invoices. It fetches invoice data asynchronously,
 * handles user interactions to navigate to detailed views, and provides visual feedback
 * during data loading states.
 *
 * @component
 * @returns {ReactElement} The rendered invoice data table component.
 */
export const InvoiceDataTable: React.FC = (): ReactElement => {
    const authContext = useAuthContext();
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams>>();

    // TODO: Figure out how to type this reload correctly...?
    // @ts-expect-error  This is hard to type/interface correctly and Im not sure why...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let reload: boolean = route.params?.reload ?? false;

    /**
     * Asynchronously fetches invoices from the backend and updates the application context
     * with the fetched data.
     *
     * @async
     * @function loadInvoices
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    const loadInvoices = async (): Promise<void> => {
        try {
            appContext.setIsRefreshing(true);
            const invoices: Invoice[] = await getInvoices();

            appContext.setInvoices(invoices || []);
        } catch (error) {
            console.error(error);
        } finally {
            reload = false;
            appContext.setIsRefreshing(false);
        }
    };

    /**
     * Refreshes the invoice list by calling the loadInvoices function.
     *
     * @function refreshLoadInvoices
     * @returns {void}
     */
    const refreshLoadInvoices: FunctionVoidType = (): void => {
        void loadInvoices();
    };

    /**
     * Logs out the user and navigates to the login screen.
     *
     * @function handleLogout
     * @returns {void}
     */
    const handleLogout: FunctionVoidType = (): void => {
        void authContext.logout();

        navigation.dispatch(
            CommonActions.navigate(NavPath.Auth.AuthScreen, {
                screen: NavPath.Auth.Login,
                params: {},
            }),
        );
    };

    /**
     * Navigates to the form for creating a new invoice.
     *
     * @function handleCreateNewInvoice
     * @returns {void}
     */
    const handleCreateNewInvoice: FunctionVoidType = (): void => {
        navigation.dispatch(
            CommonActions.navigate(NavPath.Invoices.InvoicesScreen, {
                screen: NavPath.Invoices.InvoiceForm,
                params: {},
            }),
        );
    };

    /**
     * Triggers the loadInvoices function when the component gains focus and either the
     * reload flag is set to true or there are no invoices in the app context.
     *
     * @hook useFocusEffect
     * @effect Ensures the invoice list is up-to-date whenever the user navigates to the component.
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.invoices || reload) {
                void loadInvoices();
                // @ts-expect-error  Something to do with the type of setParam reload...
                navigation.setParams({ reload: false });
            }
        }, [appContext.invoices, reload, navigation]),
    );

    /**
     * Memoizes and constructs a data table of invoices or a fallback message based on the
     * presence of invoices.
     *
     * @memo dataTable
     * @returns {ReactElement} A React element that either displays a message indicating the
     * absence of invoices or renders a data table with invoice details.
     */
    const dataTable: ReactElement = useMemo((): ReactElement => {
        if (!Array.isArray(appContext.invoices) || !appContext.invoices) {
            // Return fallback component when there are no invoices
            return (
                <View style={Style.Container.content}>
                    <Text>
                        Det finns inga inleveranser... skapa några kanske?
                    </Text>
                </View>
            );
        }

        const dataTableRows: ReactElement[] = appContext.invoices.map(
            (invoice: Invoice, index: number): ReactElement => {
                return (
                    <Pressable
                        key={index}
                        onPress={(): void => {
                            console.info(
                                `Go to InvoiceForm for Invoice (${invoice.id})`,
                                NavPath.Invoices.InvoiceSpecification,
                            );

                            // Handle row press here
                            navigation.dispatch(
                                CommonActions.navigate(
                                    NavPath.Invoices.InvoicesScreen,
                                    {
                                        screen: NavPath.Invoices
                                            .InvoiceSpecification,
                                        params: { item: invoice },
                                    },
                                ),
                            );
                        }}
                        style={({ pressed }) => [
                            Style.Container.content,
                            {
                                backgroundColor: pressed
                                    ? Style.Color.schemeOne.primary[100]
                                    : Style.Color.background.light,
                            },
                        ]}>
                        <DataTable.Row style={Style.Container.row}>
                            <DataTable.Cell style={Style.Container.gridCol[1]}>
                                {invoice.id.toString()}
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.gridCol[2]}>
                                <Text>
                                    {invoice.name.split(' ').join('\n')}
                                </Text>
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.gridCol[1]}>
                                {invoice.order_id.toString()}
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.gridCol[1]}>
                                {invoice.total_price.toString()} kr
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.gridCol[2]}>
                                {new Date(
                                    invoice.creation_date.toString(),
                                ).toLocaleString()}
                            </DataTable.Cell>
                        </DataTable.Row>
                    </Pressable>
                );
            },
        );

        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={Style.Container.gridCol[1]}>
                        Faktura
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.gridCol[1]}>
                        Namn
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.gridCol[1]}>
                        Order
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.gridCol[1]}>
                        Belopp
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.gridCol[1]}>
                        Skapad
                    </DataTable.Title>
                </DataTable.Header>

                {dataTableRows}
            </DataTable>
        );
    }, [appContext.invoices]);

    // Data Table
    return appContext.isRefreshing ? (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid}>
                <Pressable
                    style={({ pressed }) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={handleLogout}>
                    <Text style={Style.Typography.buttonText}>Logga ut</Text>
                </Pressable>

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
                        console.info(
                            'Create new invoice',
                            NavPath.Invoices.InvoiceForm,
                        );

                        navigation.dispatch(
                            CommonActions.navigate(
                                NavPath.Invoices.InvoicesScreen,
                                {
                                    screen: NavPath.Invoices.InvoiceForm,
                                    params: {},
                                },
                            ),
                        );
                    }}>
                    <Text style={Style.Typography.buttonText}>
                        Skapa ny faktura
                    </Text>
                </Pressable>

                <View style={Style.Container.content}>
                    <LoadingIndicator loadingType={'Fakturor'} />
                </View>
            </View>
        </View>
    ) : (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid}>
                <Pressable
                    style={({ pressed }) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={handleLogout}>
                    <Text style={Style.Typography.buttonText}>Logga ut</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={handleCreateNewInvoice}>
                    <Text style={Style.Typography.buttonText}>
                        Skapa ny faktura
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                style={Style.Container.content}
                refreshControl={
                    <RefreshControl
                        refreshing={appContext.isRefreshing}
                        onRefresh={refreshLoadInvoices}
                    />
                }>
                {dataTable}
            </ScrollView>
        </View>
    );
};
