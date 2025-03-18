/**
 * @module screens/invoices/invoices-navigator.tsx
 *
 * This module defines the navigator for the invoices section of the application.
 * It sets up a stack navigator with screens for displaying a list of invoices,
 * detailed information about a selected invoice, and a form for creating new invoices.
 */

import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaView, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { InvoiceForm } from './invoice-form-screen';
import { InvoiceItem } from './invoice-item-screen';
import coverIMG from 'assets/img/NutsAndBolts-7.jpg';
import * as Style from 'assets/styles';
import { InvoiceDataTable } from 'components/invoice/invoice-data-table';
import { CoverImage } from 'components/utils/cover-image';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';

/**
 * @constant InvoicesStack - The stack navigator for the invoices section.
 */
const InvoicesStack = createStackNavigator();

/**
 * InvoiceNavigator component.
 *
 * This component sets up a stack navigator for the invoices section of the application.
 * It includes screens for displaying a list of invoices, detailed information about a
 * selected invoice, and a form for creating new invoices.
 *
 * @function
 * @returns {ReactElement} The rendered invoices navigator component.
 */
export const InvoiceNavigator: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Fakturor', image: coverIMG })}

            <View style={Style.Base.content}>
                <InvoicesStack.Navigator
                    id={NavPath.Invoices.InvoicesScreen}
                    initialRouteName={NavPath.Invoices.InvoicesList}>
                    <InvoicesStack.Group
                        navigationKey={NavPath.Invoices.InvoicesScreen}>
                        <InvoicesStack.Screen
                            navigationKey={NavPath.Invoices.InvoicesList}
                            key={NavPath.Invoices.InvoicesList}
                            name={NavPath.Invoices.InvoicesList}
                            component={InvoiceDataTable}
                            options={{
                                title: 'Fakturalista',
                            }}
                        />
                        <InvoicesStack.Screen
                            navigationKey={
                                NavPath.Invoices.InvoiceSpecification
                            }
                            key={NavPath.Invoices.InvoiceSpecification}
                            name={NavPath.Invoices.InvoiceSpecification}
                            component={InvoiceItem}
                            options={{
                                title: '',
                            }}
                        />
                        <InvoicesStack.Screen
                            navigationKey={NavPath.Invoices.InvoiceForm}
                            key={NavPath.Invoices.InvoiceForm}
                            name={NavPath.Invoices.InvoiceForm}
                            component={InvoiceForm}
                            options={{
                                title: 'Skapa faktura',
                            }}
                        />
                    </InvoicesStack.Group>
                </InvoicesStack.Navigator>
            </View>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
