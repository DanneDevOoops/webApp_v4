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
 * `InvoiceDataTable` is a functional component that displays a table of invoices. It
 * integrates with the application's contexts to fetch and display invoice data, leveraging React
 * Navigation for navigation and using focus effects to reload data as needed. This component is
 * responsible for fetching invoice data asynchronously, handling user interactions to navigate
 * to detailed views, and providing visual feedback during data loading states.
 *
 * The component performs the following key functions:
 * - Fetches invoice data asynchronously from a model and updates the application contexts with
 *      this data.
 * - Utilizes the `useFocusEffect` hook to reload data when the component gains focus, based on
 *      specific conditions such as the `reload` flag being true or the invoices list being empty.
 * - Renders a table of invoices using the `DataTable` component from react-native-paper, with
 *      each row being pressable to navigate to a detailed view of the invoice.
 * - Provides a visual indication of loading state and the ability to refresh the invoice list
 *      via a pull-down gesture.
 * - Offers buttons to navigate to a form for creating a new invoice and logging out.
 *
 * Props: None
 *
 * State:
 * - Uses contexts state for managing invoices, authentication, and the refreshing state.
 * - Local state `reload` is derived from navigation parameters to determine if data should be
 *      reloaded.
 *
 * Returns:
 * - A React element that conditionally renders either a loading indicator or the table of
 *      invoices, along with buttons for creating new invoices and logging out.
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
     * Asynchronously fetches invoices from the backend and updates the application contexts
     * with the fetched data. It attempts to fetch invoices using the `InvoiceModel.getInvoices`
     * method. Upon success, the fetched invoices are stored in the application contexts. It also
     * manages the refreshing state of the application by setting `isRefreshing` to true at the
     * beginning of the fetch operation and to false upon completion, regardless of the outcome.
     * If an error occurs during the fetch operation, it is logged to the console. The `reload`
     * flag is reset to false after the operation to prevent repeated fetches on subsequent
     * renders or focus events.
     *
     * @async
     * @function loadInvoices
     * @returns {Promise<void>} A promise that resolves when the operation is complete, without
     *      returning any value.
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
     * Refreshes the invoice list by calling the `loadInvoices` function. This function is
     * intended to be used as a callback for the `RefreshControl` component, which triggers a
     * refresh when the user pulls down on the screen.
     */
    const refreshLoadInvoices: FunctionVoidType = (): void => {
        void loadInvoices();
    };

    const handleLogout: FunctionVoidType = (): void => {
        void authContext.logout();

        navigation.dispatch(
            CommonActions.navigate(NavPath.Auth.AuthScreen, {
                screen: NavPath.Auth.Login,
                params: {},
            }),
        );
    };

    const handleCreateNewInvoice: FunctionVoidType = (): void => {
        navigation.dispatch(
            CommonActions.navigate(NavPath.Invoices.InvoicesScreen, {
                screen: NavPath.Invoices.InvoiceForm,
                params: {},
            }),
        );
    };

    /**
     * Triggers the `loadInvoices` function when the component gains focus and either the
     * `reload` flag is set to true or there are no invoices in the app contexts. This effect is
     * designed to ensure that the invoice list is up-to-date whenever the user navigates to the
     * component. After successfully loading the invoices, it resets the `reload` parameter to
     * false to prevent unnecessary reloads on subsequent focus events.
     *
     * The effect is dependent on the `appContext.invoices`, `reload` flag, and the
     * `navigation.setParams` method, meaning it will re-run only when any of these dependencies
     * change.
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
     * presence of invoices. If there are no invoices available in the application contexts, a
     * message suggesting the creation of invoices is displayed. Otherwise, it generates a list
     * of pressable rows, each representing an invoice with key details such as ID, name, order
     * ID, total price, and creation date. Pressing a row navigates to a detailed view of the
     * invoice. The memoization ensures that the component only re-renders when
     * `appContext.invoices` changes, optimizing performance by avoiding unnecessary re-renders.
     *
     * The dataTableRows are constructed by mapping over `appContext.invoices`, creating a
     * pressable DataTable.Row for each invoice. The onPress event of each row is configured to
     * navigate to a detailed view of the invoice. The style of each row changes upon pressing
     * to provide visual feedback.
     *
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
