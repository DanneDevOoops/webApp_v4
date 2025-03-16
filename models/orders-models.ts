/**
 * @module orders-models.ts
 *
 * This module provides functions to interact with the order-related endpoints of the API.
 * It includes functions to fetch all orders, fetch a specific order by its ID, pick an order,
 * update the status of an order, and calculate the total price of an order.
 * Each function handles API requests and logs any errors that occur during the requests.
 *
 * Functions:
 * - getOrders: Fetches all orders from the API.
 * - getOrderById: Fetches a specific order from the API by its ID.
 * - pickOrder: Processes an order by updating the stock of the products in the order and
 * updating the order status.
 * - updateOrderStatus: Updates the status of an order in the API.
 * - calcOrderTotalPrice: Calculates the total price of an order.
 */

import * as ProductModel from './products-models';
import config from '../config/config.json';
import { RequestErrorHandler } from 'components/utils/error-handler';
import {
    MultipleOrdersDataResponse,
    Order,
    OrderItemType,
    OrderUpdate,
    SingleOrderDataResponse,
} from 'interfaces/order-interfaces';
import { ProductUpdate } from 'interfaces/product-interfaces';

/**
 * Fetches all orders from the API.
 *
 * This function sends a GET request to the API to retrieve all orders.
 * If the request is successful, it returns the order data. In case of an error, it catches
 * the error and logs it, returning an empty array.
 *
 * @async
 * @function getOrders
 * @returns {Promise<Order[]>} The response data from the API, which contains an array of orders,
 * or an empty array if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response: Response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );

        const result: MultipleOrdersDataResponse =
            (await response.json()) as MultipleOrdersDataResponse;

        return result.data;
    } catch (error) {
        console.error(error);
    }

    return [];
};

/**
 * Fetches a specific order by its ID from the API.
 *
 * This function sends a GET request to the API to retrieve a specific order by its ID.
 * If the request is successful, it returns the order data. In case of an error, it catches
 * the error and logs it, returning void.
 *
 * @async
 * @function getOrderById
 * @param {number} orderId - The ID of the order to fetch.
 * @returns {Promise<Order | void>} The response data from the API, which contains the order,
 * or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export const getOrderById = async (orderId: number): Promise<Order | void> => {
    try {
        // Fetch orders from API.
        const response: Response = await fetch(
            `${config.base_url}/orders/${orderId}?api_key=${config.api_key}`,
        );
        const result: SingleOrderDataResponse =
            (await response.json()) as SingleOrderDataResponse;

        return result.data;
    } catch (error) {
        console.error(error);
    }

    return;
};

/**
 * Processes an order by updating the stock of the products in the order and updating the order
 * status.
 *
 * This function loops through all items in the order, updates the stock of each product, and
 * updates the order status. If an error occurs during the process, it is caught and logged.
 *
 * @async
 * @function pickOrder
 * @param {Order} order - The order to process.
 * @returns {Promise<void>} A promise that resolves when the order is processed.
 * @throws {Error} If there is an error during the process, it is caught and logged.
 */
export async function pickOrder(order: Order): Promise<void> {
    try {
        let leftOverStock: number;

        // Loop through all order items and update stock
        for (const orderItem of order.order_items) {
            try {
                leftOverStock = orderItem.stock - orderItem.amount;

                if (leftOverStock <= 0) {
                    console.error('Not enough stock to pick order.');
                    RequestErrorHandler(
                        new Error('Not enough stock to pick order.'),
                    );
                    continue;
                }

                const productUpdates: ProductUpdate = {
                    api_key: `${config.api_key}`,
                    id: orderItem.product_id,
                    name: orderItem.name,
                    stock: leftOverStock,
                };

                // Update product stock.
                await ProductModel.updateProduct(productUpdates);
            } catch (error) {
                console.error(error);
            }
        }

        // Update order status
        try {
            await updateOrderStatus(order.id, order.name, 200);
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Updates the status of an order in the API.
 *
 * This function sends a PUT request to the API to update the status of an order with the
 * provided details. If the request is successful, it returns void. In case of an error, it
 * catches the error and logs it.
 *
 * @async
 * @function updateOrderStatus
 * @param {number} order_id - The ID of the order to update.
 * @param {string} order_name - The name of the order to update.
 * @param {number} new_status_id - The new status ID of the order.
 * @returns {Promise<void>} A promise that resolves when the order status is updated.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function updateOrderStatus(
    order_id: number,
    order_name: string,
    new_status_id: number,
): Promise<void> {
    try {
        const requestBody: OrderUpdate = {
            id: order_id,
            name: order_name,
            status_id: new_status_id,
            api_key: `${config.api_key}`,
        };

        await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Calculates the total price of an order.
 *
 * This function loops through all items in the order and calculates the total price based on the
 * quantity and price of each item. If an error occurs during the calculation, it is caught and
 * logged.
 *
 * @function calcOrderTotalPrice
 * @param {Partial<Order>} order - The order to calculate the total price for.
 * @returns {number} The total price of the order.
 * @throws {Error} If there is an error during the calculation, it is caught and logged.
 */
export function calcOrderTotalPrice(order: Partial<Order>): number {
    let total_price: number = 0;

    if (order && order.order_items?.length) {
        try {
            order.order_items?.forEach((orderItem: OrderItemType): void => {
                if (orderItem.amount > 0 && orderItem.price > 0) {
                    total_price += orderItem.price * orderItem.amount;
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return total_price;
}
