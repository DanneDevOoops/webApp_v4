/**
 * @module DeliveryNavigator
 *
 * This module sets up a stack navigator for the delivery-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - DeliveryList: Displays a list of deliveries.
 * - DeliveryItem: Displays detailed information about a selected delivery.
 * - DeliveryCreationForm: Provides a form for creating a new delivery.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 */
import React, { FC, ReactElement } from 'react';
import { SafeAreaView, Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import {DeliveryList} from '../../components/Delivery/DeliveryList';
import {DeliveryItem} from './DeliveryItem.screen';
import {DeliveryCreationForm} from './DeliveryForm.screen';
import { CoverImage } from '../../components/Utils/CoverImage';
import { NavigationPathKeys as NavPath } from '../../constants/Navigation';
import coverIMG from '../../assets/img/NutsAndBolts-6.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for deliveries.
 */
const Stack = createStackNavigator();


/**
 * DeliveryNavigator component.
 *
 * This component sets up a stack navigator for the delivery-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - DeliveryList: Displays a list of deliveries.
 * - DeliveryItem: Displays detailed information about a selected delivery.
 * - DeliveryCreationForm: Provides a form for creating a new delivery.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @component
 * @returns {ReactElement} The delivery stack navigator component.
 */
export const DeliveryNavigator: FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Inleveranser', image: coverIMG })}

            <View style={Style.Container.screenIntroductory as ViewStyle}>
                <Text style={Style.Typography.paragraph as TextStyle}>
                    Listan innehåller inleveranser. Varje inleverans har ett
                    inleveransnr. och datum.
                </Text>
            </View>

            <Stack.Navigator
                id={NavPath.Delivery.DeliveriesScreen}
                initialRouteName={NavPath.Delivery.DeliveriesList}>
                <Stack.Group navigationKey={NavPath.Delivery.DeliveriesScreen}>
                    <Stack.Screen
                        key={NavPath.Delivery.DeliveriesList}
                        navigationKey={NavPath.Delivery.DeliveriesList}
                        name={NavPath.Delivery.DeliveriesList}
                        component={DeliveryList}
                        options={{ title: 'Inleveranslista' }}
                    />
                    <Stack.Screen
                        key={NavPath.Delivery.DeliverySpecification}
                        navigationKey={NavPath.Delivery.DeliverySpecification}
                        name={NavPath.Delivery.DeliverySpecification}
                        component={DeliveryItem}
                        options={{ title: 'Inleveransspecifikation' }}
                    />
                    <Stack.Screen
                        key={NavPath.Delivery.DeliveryForm}
                        navigationKey={NavPath.Delivery.DeliveryForm}
                        name={NavPath.Delivery.DeliveryForm}
                        component={DeliveryCreationForm}
                        options={{ title: 'Inleverasformulär' }}
                    />
                </Stack.Group>
            </Stack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
