/**
 * @module invoices-models.ts
 *
 * This module provides functions to interact with the invoice-related endpoints of the API.
 * It includes functions to fetch all invoices, fetch a specific invoice by its ID, create a
 * new invoice, and update an existing invoice. Each function handles authentication using a JWT
 * token retrieved from SecureStore and logs any errors that occur during the API requests.
 *
 * Functions:
 * - getInvoices: Fetches all invoices from the API.
 * - getInvoiceById: Fetches a specific invoice from the API by its ID.
 * - createInvoice: Creates a new invoice in the API.
 * - updateInvoice: Updates an existing invoice in the API.
 */

import * as SecureStore from 'expo-secure-store';
import config from '../config/config.json';
import {
    Invoice,
    InvoiceDataResponse,
    NewInvoice,
} from '../interfaces/invoice-interfaces';

/**
 * Fetches all invoices from the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a GET
 * request to the API. The request fetches all invoices and returns the response data. If an
 * error occurs during the request, it is caught and logged. In the case of an error, the
 * function returns an empty array.
 *
 * @async
 * @function getInvoices
 * @returns {Promise<Invoice[]>} The response data from the API, which contains an array of
 * invoices, or an empty array if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function getInvoices(): Promise<Invoice[]> {
    try {
        console.log('getInvoices()');
        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (jwtToken) {
            requestHeaders['x-access-token'] = jwtToken;
        }
        const response: Response = await fetch(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                method: 'GET',
                headers: requestHeaders,
            },
        );

        const result = (await response.json()) as InvoiceDataResponse;

        console.log('result', result);

        return result.data;
    } catch (error) {
        console.error(error);
    }

    return [];
}

/**
 * Fetches a specific invoice from the API by its ID.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a GET
 * request to the API. The request fetches a specific invoice by its ID and returns the response
 * data. If an error occurs during the request, it is caught and logged. In the case of an
 * error, the function returns void.
 *
 * @async
 * @function getInvoiceById
 * @param {number} invoice_id - The ID of the invoice to fetch.
 * @returns {Promise<Invoice | void>} The response data from the API, which contains
 * the invoice, or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function getInvoiceById(
    invoice_id: number,
): Promise<Invoice | void> {
    try {
        const jwtToken = await SecureStore.getItemAsync('token');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
        };

        if (jwtToken) {
            requestHeaders['x-access-token'] = jwtToken;
        }

        const response: Response = await fetch(
            `${config.base_url}/invoices/${invoice_id}?api_key=${config.api_key}`,
            {
                method: 'GET',
                headers: requestHeaders,
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json()) as Invoice;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }

    return;
}

/**
 * Creates a new invoice in the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a POST
 * request to the API. The request creates a new invoice with the provided invoice details and
 * returns the response data. If an error occurs during the request, it is caught and logged. In
 * the case of an error, the function returns void.
 *
 * @async
 * @function createInvoice
 * @param {Partial<NewInvoice>} invoice - The details of the new invoice to create.
 * @returns {Promise<Invoice | void>} The response data from the API, which contains the
 * created invoice, or void if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function createInvoice(
    invoice: Partial<NewInvoice>,
): Promise<Invoice | void> {
    try {
        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (jwtToken) {
            requestHeaders['x-access-token'] = jwtToken;
        }

        const response: Response = await fetch(`${config.base_url}/invoices`, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({
                order_id: invoice.order_id,
                total_price: invoice.total_price,
                creation_date: invoice.creation_date,
                due_date: invoice.due_date,
                api_key: config.api_key,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json()) as Invoice;
    } catch (error) {
        console.error(error);
    }

    return;
}

/**
 * Updates an existing invoice in the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a PUT
 * request to the API. The request updates an existing invoice with the provided invoice details
 * and returns the status of the response. If an error occurs during the request, it is caught
 * and logged. In the case of an error, the function returns void.
 *
 * @async
 * @function updateInvoice
 * @param {Partial<Invoice>} updated_invoice - The updated details of the invoice.
 * @returns {Promise<number | void>} The status of the response from the API, or void if an
 * error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function updateInvoice(
    updated_invoice: Partial<Invoice>,
): Promise<number | void> {
    try {
        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (jwtToken) {
            requestHeaders['x-access-token'] = jwtToken;
        }

        const response: Response = await fetch(
            `${config.base_url}/invoices/${updated_invoice.id}`,
            {
                method: 'PUT',
                headers: requestHeaders,
                body: JSON.stringify({
                    ...updated_invoice,
                    api_key: config.api_key,
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
    } catch (error) {
        console.error(error);
    }

    return;
}
