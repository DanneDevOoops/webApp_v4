/**
 * @module models/deliveries-models.ts
 *
 * This module provides functions to interact with the delivery-related endpoints of the API.
 * It includes functions to fetch all deliveries and create a new delivery.
 * Each function handles API requests and logs any errors that occur during the requests.
 *
 * Functions:
 * - getDeliveries: Fetches all deliveries from the API.
 * - createDelivery: Creates a new delivery in the API.
 */

import config from 'config/config.json';
import { Delivery, DeliveryDataResponse } from 'interfaces/delivery-interfaces';

/**
 * Fetches all deliveries from the API.
 *
 * This function sends a GET request to the API to retrieve all deliveries.
 * If the request is successful, it returns the delivery data. In case of an error, it catches
 * the error and logs it, returning an empty array.
 *
 * @function getDeliveries
 * @returns {Promise<Delivery[]>} The response data from the API, which
 * contains an array of deliveries, or an empty array if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function getDeliveries(): Promise<Delivery[]> {
    try {
        const response = await fetch(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
        );
        const result: DeliveryDataResponse =
            (await response.json()) as DeliveryDataResponse;

        return result.data;
    } catch (error) {
        console.error(error);
    }

    return [];
}

/**
 * Creates a new delivery in the API.
 *
 * This function sends a POST request to the API to create a new delivery with the provided
 * delivery details. If the request is successful, it returns the newly created delivery object.
 * In case of an error, it catches the error and logs it.
 *
 * @function createDelivery
 * @param {Partial<Delivery>} delivery - The details of the new delivery
 * to create.
 * @returns {Promise<Delivery | void>} The response data from the API,
 * which contains the created delivery, or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function createDelivery(delivery: Partial<Delivery>) {
    try {
        const response = await fetch(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: delivery.product_id,
                    delivery_date: delivery.delivery_date,
                    amount: delivery.amount,
                    comment: delivery.comment,
                    api_key: `${config.api_key}`,
                }),
            },
        );

        if (response.ok) {
            return (await response.json()) as Delivery;
        }
    } catch (error) {
        console.error(error);
    }

    return;
}
