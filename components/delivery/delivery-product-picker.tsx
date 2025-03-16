import { Picker } from '@react-native-picker/picker';
import React, { ReactElement, useEffect } from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles/index';
import { useAppContext } from 'contexts/app-provider';
import { AppContextType } from 'interfaces/app-interfaces';
import { NewDeliveryPropsType } from 'interfaces/delivery-interfaces';
import { Product } from 'interfaces/product-interfaces';
import * as ProductModel from 'models/products-models';

/**
 * Picker Component for product to add to a new delivery.
 *
 * @constructor
 * @param props
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
