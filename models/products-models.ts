/**
 * @module products-models.ts
 *
 * This module provides functions to interact with the product-related endpoints of the API.
 * It includes functions to fetch all products, fetch a specific product by its ID, and update an existing product.
 * Each function handles API requests and logs any errors that occur during the requests.
 *
 * Functions:
 * - getProducts: Fetches all products from the API.
 * - getProductById: Fetches a specific product from the API by its ID.
 * - updateProduct: Updates an existing product in the API.
 */

import config from 'config/config.json';
import {
    Product,
    ProductUpdate,
    ProductsDataResponse,
} from 'interfaces/product-interfaces';

/**
 * Fetches all products from the API.
 *
 * This function sends a GET request to the API to retrieve all products.
 * If the request is successful, it returns the product data. In case of an error, it catches
 * the error and logs it, returning an empty array.
 *
 * @async
 * @function getProducts
 * @returns {Promise<Product[]>} The response data from the API, which contains an array of products,
 * or an empty array if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const response: Response = await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
        );

        const result = (await response.json()) as ProductsDataResponse;

        return result.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Fetches a specific product by its ID from the API.
 *
 * This function asynchronously requests a product by its unique identifier from the API.
 * If the request is successful, it returns the product data. In case of an error, it catches
 * the error and logs it.
 *
 * @async
 * @function getProductById
 * @param {string} product_id - The unique identifier of the product to fetch.
 * @returns {Promise<any>} A promise that resolves to the product data if successful, or
 * undefined if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
// export async function getProductById(product_id: string) {
//     try {
//         const response = await fetch(
//             `${config.base_url}/products/${product_id}?api_key=${config.api_key}`,
//         );
//
//         const result = await response.json();
//
//         return result;
//     } catch (error) {
//         RequestErrorHandler(error);
//     }
// }

/**
 * Updates an existing product in the API.
 *
 * This function sends a PUT request to the API to update an existing product with the provided
 * product details. If the request is successful, it returns the response. In case of an error,
 * it catches the error and logs it.
 *
 * @async
 * @function updateProduct
 * @param {ProductUpdate} updated_product - The updated details of the product.
 * @returns {Promise<Response | undefined>} The response from the API, or undefined if an error
 * occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function updateProduct(
    updated_product: ProductUpdate,
): Promise<Response | undefined> {
    try {
        return await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updated_product.id,
                    name: updated_product.name,
                    stock: updated_product.stock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    } catch (error) {
        console.error(error);
    }
}
