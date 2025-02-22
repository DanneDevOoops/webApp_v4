import React, { FC, ReactElement, useEffect } from 'react';
import { Text, TextStyle, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAppContext } from '../../context/App.provider';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import * as StockInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles/index';
import { AppContext } from '../../interfaces/AppContext';

/**
 * Type for DeliveryProductPicker Component input props.
 */
type NewDeliveryPropsType = {
    newDelivery: Partial<DeliveriesInterfaces.Delivery>;
    setNewDelivery: () => void;
    setSelectedProduct: (productsHash: never) => void;
};

/**
 * Picker Component for Product to add to a new delivery.
 *
 * @constructor
 * @param props
 */
export const DeliveryProductPicker: FC<NewDeliveryPropsType> = (
    props: NewDeliveryPropsType,
): ReactElement => {
    const appContext: AppContext = useAppContext();
    const productsHash = {};

    useEffect(() => {
        async function loadProducts() {
            appContext.setProducts(await ProductModel.getProducts());
        }

        void loadProducts();
    }, []); //

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const pickerProductsList: ReactElement[] = appContext.products.map(
        (product: StockInterfaces.Product, index: number) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            productsHash[product.id] = product;

            return (
                <Picker.Item
                    key={index}
                    label={product.name}
                    value={product.id}
                />
            );
        },
    );

    return (
        <View>
            <Text style={Style.Form.labelInputField as TextStyle}>
                Produkt:{' '}
            </Text>

            <Picker
                selectedValue={props.newDelivery?.product_id}
                onValueChange={(productIdValue: string) => {
                    props.setNewDelivery({
                        ...props.newDelivery,
                        product_id: productIdValue,
                    });
                    props.setSelectedProduct(productsHash[productIdValue]);
                }}>
                {pickerProductsList}
            </Picker>
        </View>
    );
};
