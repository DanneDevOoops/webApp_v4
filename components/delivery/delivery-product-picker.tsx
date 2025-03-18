/**
 * @module components/delivery/delivery-product-picker.tsx
 *
 * This module defines the picker component for selecting a product to add to a new delivery.
 * It fetches the list of products and displays them in a picker component.
 */

import { Picker } from '@react-native-picker/picker';
import React, { ReactElement, useEffect } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles/index';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import { Product } from 'interfaces/product-interfaces';
import * as ProductModel from 'models/products-models';
import { NewDeliveryPropsType } from 'types/delivery-types';

/**
 * DeliveryProductPicker component.
 *
 * This component renders a picker for selecting a product to add to a new delivery.
 * It fetches the list of products from the app context and displays them in a picker.
 *
 * @function
 * @param {NewDeliveryPropsType} props - The properties passed to the component.
 * @returns {ReactElement} The rendered delivery product picker component.
 */
export const DeliveryProductPicker: React.FC<NewDeliveryPropsType> = (
    props: NewDeliveryPropsType,
): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const productsHash: { [key: string]: Product } = {};

    useEffect((): void => {
        async function loadProducts(): Promise<void> {
            appContext.setProducts(await ProductModel.getProducts());
        }
        void loadProducts();
    }, []);

    const pickerProductsList: ReactElement[] = appContext.products
        ? appContext.products.map(
              (product: Product, index: number): ReactElement => {
                  productsHash[product.id] = product;

                  return (
                      <Picker.Item
                          key={index}
                          label={product.name}
                          value={product.id}
                      />
                  );
              },
          )
        : [];

    return (
        <View>
            <Text style={Style.Form.labelInputField}>Produkt: </Text>

            <Picker
                selectedValue={props.newDelivery?.product_id}
                onValueChange={(productIdValue: string): void => {
                    // @ts-expect-error  Some sort of type error is expected here...
                    props.setNewDelivery({
                        ...props.newDelivery,
                        product_id: productIdValue,
                    });
                    // @ts-expect-error  Some sort of type error is expected here...
                    props.setSelectedProduct(productsHash[productIdValue]);
                }}>
                {pickerProductsList}
            </Picker>
        </View>
    );
};
