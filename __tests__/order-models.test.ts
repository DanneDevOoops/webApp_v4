import { Order, OrderItemType } from 'interfaces/order-interfaces';
import {
    getOrders,
    getOrderById,
    updateOrderStatus,
    calcOrderTotalPrice,
} from 'models/orders-models';
import config from 'config/config.json';
import {
    describe,
    expect,
    it,
    beforeEach,
    afterEach,
    jest,
} from '@jest/globals';

import { Response } from 'node-fetch';

describe('Test suite for testing order-models.ts module functions', () => {
    beforeEach((): void => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach((): void => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('should fetch all orders and return the data', async () => {
        const mockOrders = [
            { id: '1', name: 'Order 1' },
            { id: '2', name: 'Order 2' },
        ];
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ data: mockOrders }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result: Order[] = await getOrders();

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );
        expect(result).toEqual(mockOrders);
    });

    it('should return an empty array if an error occurs', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        const result: Order[] = await getOrders();

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );
        expect(result).toEqual([]);
    });

    it('should fetch the order by ID and return the data', async () => {
        const mockOrder = { id: '1', name: 'Order 1' };
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ data: mockOrder }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result: void | Order = await getOrderById(1);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders/1?api_key=${config.api_key}`,
        );
        expect(result).toEqual(mockOrder);
    });

    it('should return void if an error occurs', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        const result: void | Order = await getOrderById(1);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders/1?api_key=${config.api_key}`,
        );
        expect(result).toBeUndefined();
    });

    it('should update the order status and return void', async () => {
        const mockResponse = new Response(null, { status: 200 });
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const orderId = 1;
        const orderName = 'Order 1';
        const newStatusId = 200;

        await updateOrderStatus(orderId, orderName, newStatusId);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: orderId,
                    name: orderName,
                    status_id: newStatusId,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    });

    it('should log an error and return void if an error occurs', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        const orderId = 1;
        const orderName = 'Order 1';
        const newStatusId = 200;

        await updateOrderStatus(orderId, orderName, newStatusId);

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/orders?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: orderId,
                    name: orderName,
                    status_id: newStatusId,
                    api_key: `${config.api_key}`,
                }),
            },
        );
        expect(console.error).toHaveBeenCalledWith(new Error('API error'));
    });

    it('should calculate the total price of the order correctly', () => {
        const order = {
            order_items: [
                { amount: 2, price: 10 },
                { amount: 3, price: 20 },
            ] as OrderItemType[],
        };

        const result: number = calcOrderTotalPrice(order);

        expect(result).toBe(80); // 2 * 10 + 3 * 20 = 80
    });

    it('should return 0 if the order has no items', () => {
        const order = {
            order_items: [] as OrderItemType[],
        };

        const result = calcOrderTotalPrice(order);

        expect(result).toBe(0);
    });

    it('should return 0 if the order is undefined', () => {
        const result: number = calcOrderTotalPrice(undefined);

        expect(result).toBe(0);
    });

    it('should handle items with zero or negative amounts and prices', () => {
        const order = {
            order_items: [
                { amount: 0, price: 10 },
                { amount: -1, price: 20 },
                { amount: 2, price: -10 },
            ] as OrderItemType[],
        };

        const result: number = calcOrderTotalPrice(order);

        expect(result).toBe(0);
    });
});
