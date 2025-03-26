import * as SecureStore from 'expo-secure-store';
import { Invoice, NewInvoice } from 'interfaces/invoice-interfaces';
import {
    createInvoice,
    getInvoiceById,
    getInvoices,
    updateInvoice,
} from 'models/invoices-models';
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

describe('Test suit for testing invoice.models.ts module functions', (): void => {
    beforeEach((): void => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
        jest.spyOn(SecureStore, 'getItemAsync').mockImplementation(jest.fn());
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach((): void => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('should fetch all invoices and return the data', async () => {
        const mockInvoices: Invoice[] = [
            {
                id: 1,
                name: 'Invoice 1',
                order_id: 1,
                address: 'Address 1',
                zip: '12345',
                city: 'City 1',
                country: 'Country 1',
                total_price: 100,
                due_date: new Date('2021-12-31'),
                creation_date: new Date('2021-01-01'),
            },
            {
                id: 2,
                name: 'Invoice 2',
                order_id: 2,
                address: 'Address 2',
                zip: '67890',
                city: 'City 2',
                country: 'Country 2',
                total_price: 200,
                due_date: new Date('2022-12-31'),
                creation_date: new Date('2022-01-01'),
            },
        ];
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ data: mockInvoices }),
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result: Invoice[] = await getInvoices();

        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
        expect(result).toEqual(mockInvoices);
    });

    it('should fetch a specific invoice by its ID and return the data', async () => {
        const mockInvoice: Invoice = {
            id: 1,
            name: 'Invoice 1',
            order_id: 1,
            address: 'Address 1',
            zip: '12345',
            city: 'City 1',
            country: 'Country 1',
            total_price: 100,
            due_date: new Date('2021-12-31'),
            creation_date: new Date('2021-01-01'),
        };
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockInvoice),
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const result = await getInvoiceById(1);

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/invoices/1?api_key=${config.api_key}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'x-access-token': 'mockToken',
                },
            },
        );
        expect(result).toEqual(mockInvoice);
    });

    it('should return void and log an error if fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (global.fetch as jest.Mock).mockRejectedValue(
            new Error('Network error'),
        );
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const result = await getInvoiceById(1);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Network error');

        consoleSpy.mockRestore();
    });

    it('should return void and log an error if response is not ok', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const mockResponse = {
            ok: false,
            status: 404,
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const result = await getInvoiceById(1);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('HTTP error! status: 404');

        consoleSpy.mockRestore();
    });

    it('should create a new invoice and return the data', async () => {
        const mockInvoice: Invoice = {
            id: 1,
            name: 'Invoice 1',
            order_id: 1,
            address: 'Address 1',
            zip: '12345',
            city: 'City 1',
            country: 'Country 1',
            total_price: 100,
            due_date: new Date('2021-12-31'),
            creation_date: new Date('2021-01-01'),
        };
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockInvoice),
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const newInvoice: Partial<NewInvoice> = {
            order_id: 1,
            total_price: 100,
            creation_date: new Date('2021-01-01'),
            due_date: new Date('2021-12-31'),
        };

        const result = await createInvoice(newInvoice);

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/invoices`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': 'mockToken',
                },
                body: JSON.stringify({
                    order_id: newInvoice.order_id,
                    total_price: newInvoice.total_price,
                    creation_date: newInvoice.creation_date,
                    due_date: newInvoice.due_date,
                    api_key: config.api_key,
                }),
            },
        );
        expect(result).toEqual(mockInvoice);
    });

    it('should return void and log an error if fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (global.fetch as jest.Mock).mockRejectedValue(
            new Error('Network error'),
        );
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const newInvoice: Partial<NewInvoice> = {
            order_id: 1,
            total_price: 100,
            creation_date: new Date('2021-01-01'),
            due_date: new Date('2021-12-31'),
        };

        const result = await createInvoice(newInvoice);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith(new Error('Network error'));

        consoleSpy.mockRestore();
    });

    it('should return void and log an error if response is not ok', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const mockResponse = {
            ok: false,
            status: 400,
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const newInvoice: Partial<NewInvoice> = {
            order_id: 1,
            total_price: 100,
            creation_date: new Date('2021-01-01'),
            due_date: new Date('2021-12-31'),
        };

        const result = await createInvoice(newInvoice);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith(
            new Error('HTTP error! status: 400'),
        );

        consoleSpy.mockRestore();
    });

    it('should update an existing invoice and return the status', async () => {
        const mockResponse = new Response(null, { status: 200 });
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const updatedInvoice: Partial<Invoice> = {
            id: 1,
            name: 'Updated Invoice',
            total_price: 150,
        };

        const result = await updateInvoice(updatedInvoice);

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
        expect(global.fetch).toHaveBeenCalledWith(
            `${config.base_url}/invoices/1`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': 'mockToken',
                },
                body: JSON.stringify({
                    ...updatedInvoice,
                    api_key: config.api_key,
                }),
            },
        );
        expect(result).toBe(200);
    });

    it('should return void and log an error if fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (global.fetch as jest.Mock).mockRejectedValue(
            new Error('Network error'),
        );
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const updatedInvoice: Partial<Invoice> = {
            id: 1,
            name: 'Updated Invoice',
            total_price: 150,
        };

        const result = await updateInvoice(updatedInvoice);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith(new Error('Network error'));

        consoleSpy.mockRestore();
    });

    it('should return void and log an error if response is not ok', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const mockResponse = {
            ok: false,
            status: 400,
        } as unknown as Response;
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
        (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

        const updatedInvoice: Partial<Invoice> = {
            id: 1,
            name: 'Updated Invoice',
            total_price: 150,
        };

        const result = await updateInvoice(updatedInvoice);

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith(
            new Error('HTTP error! status: 400'),
        );

        consoleSpy.mockRestore();
    });
});
