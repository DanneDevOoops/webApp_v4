import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductListItem } from 'components/product/product-list-item';

const mockItem = {
    id: '1',
    name: 'Test Product',
    article_number: '12345',
    stock: 10,
};

describe('Testing the product-list-item.tsx component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should render data for a product item into the component', () => {
        const { getByText, debug } = render(
            <ProductListItem item={mockItem} />,
        );

        expect(getByText('10 st')).toBeTruthy();
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('12345')).toBeTruthy();
    });
});
