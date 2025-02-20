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
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../components/Invoice/InvoiceDataTable
 * @requires ./InvoiceItem.screen
 * @requires ./InvoiceForm.screen
 * @requires ../../components/Utils/CoverImage
 * @requires ../../assets/styles
 * @requires ../../assets/img/NutsAndBolts-7.jpg
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { InvoiceDataTable } from '../../components/Invoice/InvoiceDataTable';
import { InvoiceItem } from './InvoiceItem.screen';
import { InvoiceForm } from './InvoiceForm.screen';
import { CoverImage } from '../../components/Utils/CoverImage';
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
 * @returns {React.ReactElement} The invoice stack navigator component.
 */
export const InvoiceNavigator: React.FC = (): React.ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Fakturor', image: coverIMG })}

            <View style={Style.Base.content as ViewStyle}>
                <Stack.Navigator>
                    <Stack.Screen
                        key='Fakturalista'
                        name='Fakturalista'
                        component={InvoiceDataTable}
                    />
                    <Stack.Screen
                        key='Fakturaspecifikation'
                        name='Fakturaspecifikation'
                        component={InvoiceItem}
                    />
                    <Stack.Screen
                        key='Skapa faktura'
                        name='Skapa faktura'
                        component={InvoiceForm}
                    />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
