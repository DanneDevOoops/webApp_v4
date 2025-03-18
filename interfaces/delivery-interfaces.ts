/**
 * @module interfaces/delivery-interfaces.ts
 *
 * This module defines various TypeScript interfaces related to delivery data and interactions.
 * These interfaces include properties for delivery entities, navigator parameters, and API
 * responses.
 */

import { ParamListBase } from '@react-navigation/native';
import { ReactElement } from 'react';

/**
 * Represents the parameters for the `DeliveriesNavigator` stack navigator.
 *
 * This interface defines the structure of the route parameters used in the deliveries navigator.
 *
 * @interface DeliveriesNavigatorParams
 * @extends {ParamListBase}
 * @property {undefined} ProductsList - The route parameter for the products list screen.
 * @property {{ item: Delivery }} ProductItem - The route parameter for the product item
 * screen, containing a delivery item.
 */
export interface DeliveriesNavigatorParams extends ParamListBase {
    ProductsList: undefined;
    ProductItem: { item: Delivery };
}

/**
 * Represents the structure of a delivery within the application.
 *
 * This interface is utilized for type-checking and ensuring consistency in delivery data handling.
 *
 * @interface Delivery
 * @property {number} id - Unique identifier for the delivery.
 * @property {string} product_id - Identifier for the product being delivered.
 * @property {string} [product_name] - Optional. Name of the product being delivered.
 * @property {number} amount - Quantity of the product being delivered.
 * @property {string} delivery_date - Scheduled date for the delivery.
 * @property {string} comment - Additional comments or instructions for the delivery.
 * @property {string} api_key - API key required for authentication to perform delivery-related
 * operations.
 */
export interface Delivery {
    id: number;
    product_id: string;
    product_name?: string;
    amount: number;
    delivery_date: string;
    comment: string;
    api_key: string;
}

/**
 * Represents the response structure for fetching multiple deliveries' data from the API.
 *
 * This interface defines the expected structure of the response when retrieving a list of
 * deliveries from the API.
 *
 * @interface DeliveryDataResponse
 * @property {Delivery[]} data - An array of `Delivery` objects representing the deliveries data.
 */
export interface DeliveryDataResponse {
    data: Delivery[];
}

/**
 * Props for the `DeliveryListItem` component.
 *
 * This interface defines the structure of the props that are passed to the `DeliveryListItem`
 * component.
 *
 * @interface DeliveryListItemProps
 * @property {Delivery} item - The delivery item to be displayed in the list.
 */
export interface DeliveryListItemProps {
    item: Delivery;
}

/**
 * Used for passing props to the `DeliveryItem` component, containing delivery details.
 *
 * This interface is specifically designed for use in navigation and component prop passing
 * within a React or React Native application, where the delivery item is passed as a parameter
 * through navigation routes.
 *
 * @interface DeliveryItemProps
 * @property {object} route - Object containing navigation route information.
 * @property {object} route.params - Parameters passed through the navigation route, including
 * the delivery item.
 * @property {Delivery} route.params.item - The delivery item being passed as a parameter.
 */
export interface DeliveryItemProps {
    route?: {
        params: {
            item: Delivery;
        };
    };
}

/**
 * Props for the `DeliveryListView` component.
 *
 * This interface defines the structure of the props that are passed to the `DeliveryListView`
 * component.
 *
 * @interface DeliveryListViewProps
 * @property {Delivery[] | null} deliveries - An array of delivery items or null if no
 * deliveries are available.
 * @property {boolean} isRefreshing - A boolean indicating whether the list is currently being
 * refreshed.
 * @property {() => void} onRefresh - A function to be called when the list needs to be refreshed.
 * @property {({ item }: { item: Delivery }) => ReactElement} renderItem - A function that
 * renders a delivery item.
 */
export interface DeliveryListViewProps {
    deliveries: Delivery[] | null;
    isRefreshing: boolean;
    onRefresh: () => void;
    renderItem: ({ item }: { item: Delivery }) => ReactElement;
}
