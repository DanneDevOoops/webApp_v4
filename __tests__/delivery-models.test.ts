import { Delivery } from 'interfaces/delivery-interfaces';
import { createDelivery, getDeliveries } from '../models/deliveries-models';
import config from 'config/config.json';
import * as DeliveriesInterfaces from 'interfaces/delivery-interfaces';
import {
    describe,
    expect,
    it,
    beforeEach,
    afterEach,
    jest,
} from '@jest/globals';
describe('Test suite for testing delivery-models.ts module functions', () => {
    beforeEach(() => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
        jest.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockClear();
    });

    it('should fetch deliveries and return data', async () => {
        const mockDeliveries: DeliveriesInterfaces.Delivery[] = [
            {
                id: 1,
                product_id: 1,
                delivery_date: '2023-01-01',
                amount: 10,
                comment: 'Test',
            },
        ];
        const mockResponse = {
            data: mockDeliveries,
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const deliveries: Delivery[] = await getDeliveries();
        expect(deliveries).toEqual(mockDeliveries);
        expect(fetch).toHaveBeenCalledWith(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
        );
    });

    it('should return an empty array if fetch fails', async () => {
        fetch.mockRejectedValueOnce(new Error('API is down'));

        const deliveries: Delivery[] = await getDeliveries();
        expect(deliveries).toEqual([]);
        expect(fetch).toHaveBeenCalledWith(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
        );
    });

    it('should create a new delivery and return the response', async () => {
        const newDelivery: Partial<DeliveriesInterfaces.Delivery> = {
            product_id: 1,
            delivery_date: '2023-01-01',
            amount: 10,
            comment: 'Test',
        };

        const mockResponse = {
            id: 1,
            ...newDelivery,
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const response = await createDelivery(newDelivery);
        expect(response).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newDelivery,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    });

    it('should log an error if the request fails', async () => {
        const newDelivery: Partial<DeliveriesInterfaces.Delivery> = {
            product_id: 1,
            delivery_date: '2023-01-01',
            amount: 10,
            comment: 'Test',
        };

        const consoleErrorSpy = jest.spyOn(console, 'error');

        fetch.mockRejectedValueOnce(new Error('API is down'));

        await createDelivery(newDelivery);
        expect(consoleErrorSpy).toHaveBeenCalled();
    });
});
