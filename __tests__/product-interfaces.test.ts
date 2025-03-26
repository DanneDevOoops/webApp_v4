import { Product } from 'interfaces/product-interfaces';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';

describe('Testing the product-interfaces.ts module', () => {
    let test_product: Product;

    beforeEach((): void => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.clearAllMocks();

        test_product = {
            id: 1,
            article_number: 'A123',
            name: 'Sample Product',
            description: 'This is a sample product.',
            specifiers: 'Sample specifiers',
            stock: 100,
            location: 'Warehouse A',
            price: 29.99,
            api_key: 'sample-api-key',
        };
    });

    afterEach((): void => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('a Product should have all required properties', () => {
        expect(test_product).toHaveProperty('id');
        expect(test_product).toHaveProperty('article_number');
        expect(test_product).toHaveProperty('name');
        expect(test_product).toHaveProperty('description');
        expect(test_product).toHaveProperty('specifiers');
        expect(test_product).toHaveProperty('stock');
        expect(test_product).toHaveProperty('location');
        expect(test_product).toHaveProperty('price');
        expect(test_product).toHaveProperty('api_key');
    });

    it('a Product should match the Product interface structure', () => {
        const expectedProduct: Product = {
            id: 1,
            article_number: 'A123',
            name: 'Sample Product',
            description: 'This is a sample product.',
            specifiers: 'Sample specifiers',
            stock: 100,
            location: 'Warehouse A',
            price: 29.99,
            api_key: 'sample-api-key',
        };

        expect(test_product).toEqual(expectedProduct);
    });
});
