/**
 * @module order-interfaces
 *
 * This module defines TypeScript interfaces and types for order-related data structures used
 * throughout the application. These interfaces ensure type safety and consistency when working
 * with order data, including order details, order items, and API responses.
 *
 * Interfaces:
 * - Order: Represents the structure of an order within the application.
 * - SingleOrderDataResponse: Represents the response structure for a single order data from the
 * API.
 * - MultipleOrdersDataResponse: Represents the response structure for multiple orders data
 * from the API.
 * - OrderCreate: Defines the required and optional fields for creating a new order.
 * - OrderUpdate: Defines the required and optional fields for updating an existing order.
 * - OrderDelete: Defines the structure for deleting an existing order.
 * - OrderItemType: Represents the structure of an item within an order.
 * - OrderItemProps: Used for passing props to the OrderItemType component, containing order
 * details.
 * - OrderStockIndicatorElement: Represents a visual indicator element for the stock status of
 * an order item.
 * - OrderListItemPropsType: Represents the properties for an order list item.
 *
 * Types:
 * - OrderItemProp: Represents the properties for an order item.
 */

/**
 * Represents the structure of an order within the application.
 *
 * @interface Order
 * @property {number} id - Unique identifier for the order.
 * @property {string} name - Name associated with the order.
 * @property {string} address - delivery address for the order.
 * @property {string} zip - ZIP/postal code for the delivery address.
 * @property {string} city - City of the delivery address.
 * @property {string} country - Country of the delivery address.
 * @property {string} status - Current status of the order.
 * @property {number} status_id - Numeric identifier for the order's status.
 * @property {string} api_key - API key associated with the order for authentication.
 * @property {string | null} image_url - URL of the image associated with the order, if any.
 * @property {OrderItemType[] | []} order_items - List of items included in the order.
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
 * Represents the response structure for a single order data from the API.
 *
 * @interface SingleOrderDataResponse
 * @property {Order} data - A single order returned from the API.
 */
export interface SingleOrderDataResponse {
    data: Order;
}

/**
 * Represents the response structure for multiple orders data from the API.
 *
 * @interface MultipleOrdersDataResponse
 * @property {Order[]} data - An array of orders returned from the API.
 */
export interface MultipleOrdersDataResponse {
    data: Order[];
}

/**
 * Defines the required and optional fields for creating a new order.
 *
 * @interface OrderCreate
 * @property {string} name - Name associated with the order.
 * @property {string} api_key - API key required for order creation.
 * @property {string} [address] - Optional delivery address for the order.
 * @property {string} [zip] - Optional ZIP/postal code for the delivery address.
 * @property {string} [city] - Optional city of the delivery address.
 * @property {string} [country] - Optional country of the delivery address.
 * @property {string} [image_url] - Optional URL of the image associated with the order.
 * @property {number} [status_id] - Optional numeric identifier for the order's status.
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
 * Defines the required and optional fields for updating an existing order.
 *
 * @interface OrderUpdate
 * @property {number} id - Unique identifier for the order to be updated.
 * @property {string} name - Updated name for the order.
 * @property {string} api_key - API key required for updating the order.
 * @property {string} [address] - Optional updated delivery address for the order.
 * @property {string} [zip] - Optional updated ZIP/postal code for the delivery address.
 * @property {string} [city] - Optional updated city of the delivery address.
 * @property {string} [country] - Optional updated country of the delivery address.
 * @property {string} [image_url] - Optional updated URL of the image associated with the order.
 * @property {number} [status_id] - Optional updated numeric identifier for the order's status.
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
 * Defines the structure for deleting an existing order.
 *
 * @interface OrderDelete
 * @property {number} id - Unique identifier for the order to be deleted.
 * @property {string} api_key - API key required for deleting the order.
 */
export interface OrderDelete {
    id: number;
    api_key: string;
}

/**
 * Represents the structure of an item within an order.
 *
 * @interface OrderItemType
 * @property {number} product_id - Unique identifier for the product.
 * @property {number} amount - Quantity of the product ordered.
 * @property {string} article_number - Article number of the product.
 * @property {string} name - Name of the product.
 * @property {string} description - Description of the product.
 * @property {string} specifiers - Specific details or specifications of the product.
 * @property {number} stock - Available stock for the product.
 * @property {string} location - Location of the product within the warehouse.
 * @property {number} price - Price of the product.
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
 * Used for passing props to the OrderItemType component, containing order details.
 *
 * @interface OrderItemProps
 * @property {object} route - Object containing navigation route information.
 * @property {object} route.params - Parameters passed through the navigation route.
 * @property {Order} route.params.item - The order item being passed as a parameter.
 */
export interface OrderItemProps {
    route?: {
        params: {
            item: Order;
        };
    };
}

/**
 * Represents a visual indicator element for the stock status of an order item.
 *
 * @interface OrderStockIndicatorElement
 * @property {string} icon - Icon representing the stock status.
 * @property {string} color - Color code representing the stock status visually.
 * @property {string} text - Text description of the stock status.
 */
export interface OrderStockIndicatorElement {
    icon: string;
    color: string;
    text: string;
}

/**
 * Represents the properties for an order list item.
 *
 * @interface OrderListItemPropsType
 * @property {object} item - The order item.
 * @property {number} item.id - Unique identifier for the order.
 * @property {string} item.name - Name of the order.
 * @property {number} item.status_id - Numeric identifier for the order's status.
 */
export interface OrderListItemPropsType {
    item: {
        id: number;
        name: string;
        status_id: number;
    };
}

/**
 * Represents the properties for an order item.
 *
 * @type OrderItemProp
 * @property {Order} item - The order item.
 */
export type OrderItemProp = {
    item: Order;
};
