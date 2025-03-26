import { getProducts, updateProduct } from 'models/products-models';
import config from 'config/config.json';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from '@jest/globals';

import { Response } from 'node-fetch';

describe('Test suite for testing product-models.ts module functions', (): void => {
    beforeEach((): void => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach((): void => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('should fetch all products and return the data', async () => {
        const mockProducts = [
            { id: '1', name: 'Product 1' },
            { id: '2', name: 'Product 2' },
        ];
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ data: mockProducts }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await getProducts();

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/products?api_key=${config.api_key}`,
        );
        expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if an error occurs', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        const result = await getProducts();

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/products?api_key=${config.api_key}`,
        );
        expect(result).toEqual([]);
    });

    it('should update the product and return the response', async () => {
        const mockResponse = new Response(null, { status: 200 });
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const updatedProduct = {
            id: '1',
            name: 'Updated Product',
            stock: 20,
        };

        const result = await updateProduct(updatedProduct);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/products?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    stock: updatedProduct.stock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
        expect(result).toEqual(mockResponse);
    });

    it('should return undefined if an error occurs', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        const updatedProduct = {
            id: '1',
            name: 'Updated Product',
            stock: 20,
        };

        const result = await updateProduct(updatedProduct);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/products?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    stock: updatedProduct.stock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
        expect(result).toBeUndefined();
    });
});
