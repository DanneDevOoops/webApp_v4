/**
 * @module order-interfaces.ts
 *
 * This module defines various TypeScript interfaces related to order data and interactions.
 * These interfaces include properties for order entities, API responses, and order item types.
 */

/**
 * Represents the structure of an order entity within the application.
 *
 * This interface is utilized for type-checking and ensuring consistency in order data handling.
 *
 * @interface Order
 * @property {number} id - Unique identifier for the order.
 * @property {string} name - The name of the order.
 * @property {string} address - The address associated with the order.
 * @property {string} zip - The ZIP code of the order's address.
 * @property {string} city - The city of the order's address.
 * @property {string} country - The country of the order's address.
 * @property {string} status - The current status of the order.
 * @property {number} status_id - The identifier for the order's status.
 * @property {string} api_key - An API key associated with the order for identification or integration purposes.
 * @property {string | null} image_url - The URL of the image associated with the order, if any.
 * @property {OrderItemType[]} order_items - An array of order items included in the order.
 */
export interface Order {
    id: number;
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    status: string;
    status_id: number;
    api_key: string;
    image_url: string | null;
    order_items: OrderItemType[] | [];
}

/**
 * Represents the response structure for fetching a single order's data from the API.
 *
 * This interface defines the expected structure of the response when retrieving a single order from the API.
 *
 * @interface SingleOrderDataResponse
 * @property {Order} data - An `Order` object representing the order data.
 */
export interface SingleOrderDataResponse {
    data: Order;
}

/**
 * Represents the response structure for fetching multiple orders' data from the API.
 *
 * This interface defines the expected structure of the response when retrieving a list of orders from the API.
 *
 * @interface MultipleOrdersDataResponse
 * @property {Order[]} data - An array of `Order` objects representing the orders data.
 */
export interface MultipleOrdersDataResponse {
    data: Order[];
}

/**
 * Defines the structure for creating a new order within the system.
 * This interface specifies the required and optional fields needed when adding a new order.
 *
 * @interface OrderCreate
 * @property {string} name - The name of the new order.
 * @property {string} api_key - An API key required for order creation operations.
 * @property {string} [address] - Optional. The address associated with the order.
 * @property {string} [zip] - Optional. The ZIP code of the order's address.
 * @property {string} [city] - Optional. The city of the order's address.
 * @property {string} [country] - Optional. The country of the order's address.
 * @property {string} [image_url] - Optional. The URL of the image associated with the order.
 * @property {number} [status_id] - Optional. The identifier for the order's status.
 */
export interface OrderCreate {
    // Required fields.
    name: string;
    api_key: string;

    // Optional fields.
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    image_url?: string;
    status_id?: number;
}

/**
 * Describes the structure for updating an existing order's information.
 *
 * This interface outlines both the required fields for identifying the order and the optional fields that can be updated.
 *
 * @interface OrderUpdate
 * @property {number} id - The unique identifier of the order to be updated.
 * @property {string} name - The new name of the order.
 * @property {string} api_key - An API key required for order update operations.
 * @property {string} [address] - Optional. New or updated address associated with the order.
 * @property {string} [zip] - Optional. New or updated ZIP code of the order's address.
 * @property {string} [city] - Optional. New or updated city of the order's address.
 * @property {string} [country] - Optional. New or updated country of the order's address.
 * @property {string} [image_url] - Optional. New or updated URL of the image associated with the order.
 * @property {number} [status_id] - Optional. New or updated identifier for the order's status.
 */
export interface OrderUpdate {
    id: number;
    name: string;
    api_key: string;
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    image_url?: string;
    status_id?: number;
}

/**
 * Defines the structure for deleting an existing order from the system.
 * This interface requires the minimal information necessary to identify and delete an order.
 *
 * @interface OrderDelete
 * @property {number} id - The unique identifier of the order to be deleted.
 * @property {string} api_key - An API key required for order deletion operations.
 */
export interface OrderDelete {
    id: number;
    api_key: string;
}

/**
 * Represents the structure of an order item within an order.
 *
 * This interface defines the properties of an order item, including product details and quantity.
 *
 * @interface OrderItemType
 * @property {number} product_id - The unique identifier of the product.
 * @property {number} amount - The quantity of the product ordered.
 * @property {string} article_number - The article number of the product.
 * @property {string} name - The name of the product.
 * @property {string} description - A brief description of the product.
 * @property {string} specifiers - Detailed specifications or characteristics of the product.
 * @property {number} stock - The quantity of the product available in stock.
 * @property {string} location - The storage location of the product within a warehouse or store.
 * @property {number} price - The selling price of the product.
 */
export interface OrderItemType {
    product_id: number;
    amount: number;
    article_number: string;
    name: string;
    description: string;
    specifiers: string;
    stock: number;
    location: string;
    price: number;
}

/**
 * Interface representing the properties for the `OrderItem` component.
 *
 * This interface defines the structure of the props that are passed to the `OrderItem` component.
 *
 * @interface OrderItemProps
 * @property {Object} route - The route object containing the parameters for the order item.
 * @property {Object} route.params - The parameters for the order item.
 * @property {Order} route.params.item - The order item to be displayed by the `OrderItem` component.
 */
export interface OrderItemProps {
    route?: {
        params: {
            item: Order;
        };
    };
}

/**
 * Represents the structure of an order stock indicator element.
 *
 * This interface defines the properties of an order stock indicator element, including icon, color, and text.
 *
 * @interface OrderStockIndicatorElement
 * @property {string} icon - The icon representing the stock indicator.
 * @property {string} color - The color of the stock indicator.
 * @property {string} text - The text associated with the stock indicator.
 */
export interface OrderStockIndicatorElement {
    icon: string;
    color: string;
    text: string;
}

/**
 * Interface representing the properties for the `OrderListItem` component.
 *
 * This interface defines the structure of the props that are passed to the `OrderListItem` component.
 *
 * @interface OrderListItemPropsType
 * @property {Object} item - The order item to be displayed by the `OrderListItem` component.
 * @property {number} item.id - The unique identifier of the order.
 * @property {string} item.name - The name of the order.
 * @property {number} item.status_id - The identifier for the order's status.
 */
export interface OrderListItemPropsType {
    item: {
        id: number;
        name: string;
        status_id: number;
    };
}

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
};
