/**
 * @module types/order-types.ts
 */

import { Order } from 'interfaces/order-interfaces';

/**
 * @module types/order-types.ts
 *
 * Props for the OrderActionButton component.
 *
 * @typedef {Object} OrderActionButtonProps
 * @property {function} onPress - The handler function to be called when the button is pressed.
 * @property {string} text - The text to be displayed on the button.
 */
export type OrderActionButtonProps = {
    onPress: () => void;
    text: string;
};

/**
 * Type representing the properties for the `OrderItem` component.
 *
 * This type defines the structure of the props that are passed to the `OrderItem` component.
 *
 * @type OrderItemProp
 * @property {Order} item - The order item to be displayed by the `OrderItem` component.
 */
export type OrderItemProp = {
    item: Order;
    navigation: never;
};
