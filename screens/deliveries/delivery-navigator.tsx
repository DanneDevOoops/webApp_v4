/**
 * @module screens/deliveries/delivery-navigator.tsx
 *
 * This module defines the navigator for the deliveries section of the application.
 * It sets up a stack navigator with screens for displaying a list of deliveries,
 * detailed information about a selected delivery, and a form for creating new deliveries.
 */

import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import { DeliveryCreationForm } from './delivery-form-screen';
import { DeliveryItem } from './delivery-item-screen';
import coverIMG from 'assets/img/NutsAndBolts-6.jpg';
import * as Style from 'assets/styles';
import { DeliveryList } from 'components/delivery/delivery-list';
import { CoverImage } from 'components/utils/cover-image';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';

/**
 * @constant DeliveriesStack - The stack navigator for the deliveries section.
 */
const DeliveriesStack = createStackNavigator();

/**
 * DeliveryNavigator component.
 *
 * This component sets up a stack navigator for the deliveries section of the application.
 * It includes screens for displaying a list of deliveries, detailed information about a
 * selected delivery, and a form for creating new deliveries.
 *
 * @function
 * @returns {ReactElement} The rendered deliveries navigator component.
 */
export const DeliveryNavigator: React.FC = (): ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Inleveranser', image: coverIMG })}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Listan innehåller inleveranser. Varje inleverans har ett
                    inleveransnr. och datum.
                </Text>
            </View>

            <DeliveriesStack.Navigator
                id={NavPath.Delivery.DeliveriesScreen}
                initialRouteName={NavPath.Delivery.DeliveriesList}>
                <DeliveriesStack.Group
                    navigationKey={NavPath.Delivery.DeliveriesScreen}>
                    <DeliveriesStack.Screen
                        key={NavPath.Delivery.DeliveriesList}
                        navigationKey={NavPath.Delivery.DeliveriesList}
                        name={NavPath.Delivery.DeliveriesList}
                        component={DeliveryList}
                        options={{ title: 'Inleveranslista' }}
                    />
                    <DeliveriesStack.Screen
                        key={NavPath.Delivery.DeliverySpecification}
                        navigationKey={NavPath.Delivery.DeliverySpecification}
                        name={NavPath.Delivery.DeliverySpecification}
                        component={DeliveryItem}
                        options={{ title: 'Inleveransspecifikation' }}
                    />
                    <DeliveriesStack.Screen
                        key={NavPath.Delivery.DeliveryForm}
                        navigationKey={NavPath.Delivery.DeliveryForm}
                        name={NavPath.Delivery.DeliveryForm}
                        component={DeliveryCreationForm}
                        options={{ title: 'Inleverasformulär' }}
                    />
                </DeliveriesStack.Group>
            </DeliveriesStack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position='top' />
        </SafeAreaView>
    );
};
