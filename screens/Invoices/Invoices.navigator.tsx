/**
 * @module InvoiceNavigator
 *
 * This module sets up a stack navigator for the invoice-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - InvoiceDataTable: Displays a list of invoices.
 * - InvoiceItem: Displays detailed information about a selected invoice.
 * - InvoiceForm: Provides a form for creating a new invoice.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 */
import React, { FC, ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { InvoiceDataTable } from '../../components/Invoice/InvoiceDataTable';
import { InvoiceItem } from './InvoiceItem.screen';
import { InvoiceForm } from './InvoiceForm.screen';
import { CoverImage } from '../../components/Utils/CoverImage';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import coverIMG from '../../assets/img/NutsAndBolts-7.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for invoices.
 */
const Stack = createStackNavigator();


/**
 * InvoiceNavigator component.
 *
 * This component sets up a stack navigator for the invoice-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - InvoiceDataTable: Displays a list of invoices.
 * - InvoiceItem: Displays detailed information about a selected invoice.
 * - InvoiceForm: Provides a form for creating a new invoice.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @component
 * @returns {ReactElement} The invoice stack navigator component.
 */
export const InvoiceNavigator: FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Fakturor', image: coverIMG })}

            <View style={Style.Base.content as ViewStyle}>
                <Stack.Navigator
                    id={NavPath.Invoices.InvoicesScreen}
                    initialRouteName={NavPath.Invoices.InvoicesList}>
                    <Stack.Group
                        navigationKey={NavPath.Invoices.InvoicesScreen}>
                        <Stack.Screen
                            navigationKey={NavPath.Invoices.InvoicesList}
                            key={NavPath.Invoices.InvoicesList}
                            name={NavPath.Invoices.InvoicesList}
                            component={InvoiceDataTable}
                            options={{
                                title: 'Fakturalista',
                            }}
                        />
                        <Stack.Screen
                            navigationKey={
                                NavPath.Invoices.InvoiceSpecification
                            }
                            key={NavPath.Invoices.InvoiceSpecification}
                            name={NavPath.Invoices.InvoiceSpecification}
                            component={InvoiceItem}
                            options={{
                                title: 'Fakturaspecifikation',
                            }}
                        />
                        <Stack.Screen
                            navigationKey={NavPath.Invoices.InvoiceForm}
                            key={NavPath.Invoices.InvoiceForm}
                            name={NavPath.Invoices.InvoiceForm}
                            component={InvoiceForm}
                            options={{
                                title: 'Skapa faktura',
                            }}
                        />
                    </Stack.Group>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
