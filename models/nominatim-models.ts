/**
 * @module nominatim-models.ts
 *
 * This module provides functions to interact with the Nominatim API for geocoding.
 * It includes functions to fetch geographical coordinates for a given address.
 * Each function handles API requests and logs any errors that occur during the requests.
 *
 * Functions:
 * - getCoordinates: Fetches the geographical coordinates for a given address using the
 * Nominatim API.
 */

import { CoordinatesResponse } from 'interfaces/utils-interfaces';

/**
 * Fetches the geographical coordinates for a given address using the Nominatim API.
 *
 * This function takes an address as input, encodes it for use in a URL, and sends a request to the
 * Nominatim API to retrieve the corresponding geographical coordinates in JSON format.
 * If the request is successful, it returns the coordinates data. In case of an error, it catches
 * the error and logs it.
 *
 * @async
 * @function getCoordinates
 * @param {string} address - The address for which to fetch coordinates.
 * @returns {Promise<CoordinatesResponse[] | undefined>} A promise that resolves to the JSON
 * response containing the coordinates, or undefined if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught and logged.
 */
export async function getCoordinates(
    address: string,
): Promise<CoordinatesResponse[] | undefined> {
    try {
        const urlEncodedAddress: string = encodeURIComponent(address);
        const url: string =
            'https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=';
        const response: Response = await fetch(`${url}${urlEncodedAddress}`);

        return (await response.json()) as CoordinatesResponse[];
    } catch (error) {
        console.error('<?> getCoordinates -> ERROR: ', error);
    }
}
