/**
 * @module screens/deliveries/delivery-form-screen.tsx
 *
 * This module provides a form for creating a new delivery. It includes fields for product selection,
 * amount, delivery date, and comments. The form also includes a date picker for selecting the delivery date.
 * Upon form submission, a new delivery is created and the selected product's stock is updated.
 */
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement, useEffect, useState } from 'react';
import {
    Button,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import * as Style from 'assets/styles';
import { DeliveryProductPicker } from 'components/delivery/delivery-product-picker';
import config from 'config/config.json';
import { NavigationPathKeys as NavPath } from 'constants/navigation-constants';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import * as DeliveriesInterfaces from 'interfaces/delivery-interfaces';
import { Delivery } from 'interfaces/delivery-interfaces';
import { Product } from 'interfaces/product-interfaces';
import * as DeliveryModel from 'models/deliveries-models';
import * as ProductModel from 'models/products-models';

/**
 * Create new delivery form component.
 *
 * This component provides a form for creating a new delivery. It includes fields for product selection,
 * amount, delivery date, and comments. The form also includes a date picker for selecting the delivery date.
 * Upon form submission, a new delivery is created and the selected product's stock is updated.
 *
 * @function
 * @returns {ReactElement} The delivery creation form component.
 */
export const DeliveryCreationForm: React.FC = (): ReactElement => {
    const navigation = useNavigation();
    const appContext: AppContextType = useAppContext();

    const [newDelivery, setNewDelivery] =
        useState<Partial<DeliveriesInterfaces.Delivery>>();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        appContext.products ? appContext.products[0] : null,
    );

    /**
     * Hook to set initial values for the delivery form.
     *
     * This hook is executed after the component mounts and fetches the products if they are not already
     * loaded. It then sets the initial values for the delivery form, including the product_id,
     * delivery_date, amount, comment, and api_key. The product_id is set to the id of the first product,
     * the delivery_date is set to the current date, the amount is set to 0, the comment is set to an
     * empty string, and the api_key is set from the config.
     */
    useEffect((): void => {
        const fetchProductsAndSetInitialValues = async (): Promise<void> => {
            if (appContext.products?.length === 0) {
                await ProductModel.getProducts().then(
                    (products: Product[]): void => {
                        appContext.setProducts(products);
                    },
                );
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const initialDeliveryValues: Delivery = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                product_id: appContext.products[0].id.toString(),
                delivery_date: new Date().toLocaleDateString('se-SV'),
                amount: 0,
                comment: '',
                api_key: config.api_key,
            };

            setNewDelivery(initialDeliveryValues);
        };

        void fetchProductsAndSetInitialValues();
    }, []);

    /**
     * DateTime Picker Function to create new delivery datetime.
     *
     * This function provides a date picker for selecting the delivery date. It includes a button for
     * showing the date picker and a DateTimePicker component for selecting the date. The selected date is
     * then set as the delivery date.
     *
     * @constructor
     * @returns {ReactElement} The date picker component.
     */
    function DeliveryDatePicker(): ReactElement {
        const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
        const [show, setShow] = useState<boolean>(false);
        const showDatePicker = () => {
            setShow(true);
        };

        return (
            <View style={{ width: '50%' }}>
                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(show || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(
                            event: DateTimePickerEvent,
                            date?: Date,
                        ): void => {
                            if (date) {
                                setDropDownDate(date);
                                setNewDelivery({
                                    ...newDelivery,
                                    delivery_date:
                                        date.toLocaleDateString('se-SV'),
                                });
                                setShow(false);
                            }
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    /**
     * Handle form submission.
     *
     * This function handles the form submission. It creates a new delivery with the form data and
     * updates the selected product's stock. It also displays a success message with the new delivery's
     * details and the updated product's stock.
     */
    async function handleSubmit(): Promise<void> {
        try {
            if (selectedProduct && selectedProduct.id !== undefined) {
                const updatedProduct = {
                    ...selectedProduct,
                    stock:
                        (selectedProduct ? selectedProduct.stock : 0) +
                        (newDelivery?.amount ?? 0),
                };

                await DeliveryModel.createDelivery(
                    newDelivery ? newDelivery : {},
                );
                await ProductModel.updateProduct(updatedProduct);

                showMessage({
                    message:
                        'Ny Inleverans har skapats.\n \n' +
                        `Produkt id: ${newDelivery?.product_id}\n` +
                        `Antal: ${newDelivery?.amount}\n` +
                        `Leveransdatum: ${newDelivery?.delivery_date}\n` +
                        `Kommentar: ${newDelivery?.comment}\n` +
                        `Nytt lagersaldo: ${updatedProduct.stock}`,
                    description:
                        'Inleverans skapad och lagersaldo är uppdaterat.',
                    type: 'success',
                    duration: 3500,
                });

                navigation.dispatch(
                    CommonActions.navigate(NavPath.Delivery.DeliveriesScreen, {
                        screen: NavPath.Delivery.DeliveriesList,
                        params: { reload: true },
                    }),
                );
            } else {
                console.error('Selected product is missing an id.');
            }
        } catch (error) {
            console.error('Handle Submit Error: ', error);
        }
    }

    return (
        <ScrollView style={Style.Container.content}>
            <DeliveryProductPicker
                newDelivery={newDelivery ?? {}}
                // @ts-expect-error Some sort of type error here...
                setNewDelivery={setNewDelivery}
                // @ts-expect-error Some sort of type error here...
                setSelectedProduct={setSelectedProduct}
            />
            <View style={Style.Container.row}>
                <Text style={Style.Form.labelInputField}>Antal: </Text>
                <TextInput
                    style={Style.Form.textInputField}
                    onChangeText={(inputAmount: string): void => {
                        setNewDelivery({
                            ...newDelivery,
                            amount: parseInt(inputAmount) || 0,
                        });
                    }}
                    value={newDelivery?.amount?.toString()}
                    keyboardType={'numeric'}
                    placeholder='Antal av levererad produkt.'
                />
            </View>
            <View style={Style.Container.row}>
                <Text style={[Style.Form.labelInputField, { width: '50%' }]}>
                    Leveransdatum:
                </Text>
                {DeliveryDatePicker()}
            </View>
            <View style={Style.Container.row}>
                <Text style={Style.Form.labelInputField}>Kommentar: </Text>
                <TextInput
                    style={Style.Form.textInputField}
                    onChangeText={(inputComment: string): void => {
                        setNewDelivery({
                            ...newDelivery,
                            comment: inputComment,
                        });
                    }}
                    value={newDelivery?.comment}
                />
            </View>
            <Pressable
                style={Style.Button.buttonContainer}
                onPress={(): void => {
                    handleSubmit().catch((error): void => {
                        console.error('Error in handleSubmit: ', error);
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </Pressable>
            <StatusBar style='auto' />
        </ScrollView>
    );
};
