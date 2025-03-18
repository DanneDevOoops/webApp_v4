/**
 * @module types/delivery-types.ts
 *
 * Delivery types for the application.
 *
 * This module contains type definitions for `Deliveries` related components, models and utilities.
 */

import { Delivery } from 'interfaces/delivery-interfaces';
import { Product } from 'interfaces/product-interfaces';

/**
 * Props for the `DeliveryProductPicker` component.
 *
 * This interface defines the structure of the props that are passed to the
 * `DeliveryProductPicker` component.
 *
 * @type NewDeliveryPropsType
 * @property {Partial<Delivery>} newDelivery - Partial delivery object containing the new
 * delivery details.
 * @property {Function} setNewDelivery - Function to update the new delivery details.
 * @property {Function} setSelectedProduct - Function to set the selected product based on the
 * product hash.
 * @property {Object.<string, Product>} setSelectedProduct - Hash map of products keyed by
 * their IDs.
 */
export type NewDeliveryPropsType = {
    newDelivery: Partial<Delivery>;
    setNewDelivery: () => void;
    setSelectedProduct: (productsHash: { [key: string]: Product }) => void;
};
