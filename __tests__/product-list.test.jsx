import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ProductList } from 'components/product/product-list';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppContext } from 'contexts/app-provider';
import { getProducts } from 'models/products-models';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
    useFocusEffect: jest.fn(),
}));

jest.mock('contexts/app-provider', () => ({
    useAppContext: jest.fn(),
}));

jest.mock('models/products-models', () => ({
    getProducts: jest.fn(),
}));

describe('Test product-list.tsx component to render', () => {
    const mockNavigation = {
        dispatch: jest.fn(),
        setParams: jest.fn(),
    };
    const mockRoute = {
        params: { reload: false },
    };
    const mockAppContext = {
        products: [],
        setProducts: jest.fn(),
        isRefreshing: false,
        setIsRefreshing: jest.fn(),
    };

    beforeEach(() => {
        useNavigation.mockReturnValue(mockNavigation);
        useRoute.mockReturnValue(mockRoute);
        useAppContext.mockReturnValue(mockAppContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading indicator when refreshing list of products', () => {
        mockAppContext.isRefreshing = true;
        const { getByText } = render(<ProductList />);
        expect(getByText('Laddar Produkter...')).toBeTruthy();
    });

    it('should render product list when products are available', async () => {
        mockAppContext.isRefreshing = false;
        mockAppContext.products = [
            { id: '1', name: 'Product 1', article_number: '123', stock: 10 },
            { id: '2', name: 'Product 2', article_number: '456', stock: 20 },
        ];
        const { getByText } = render(<ProductList />);

        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(getByText('123')).toBeTruthy();
            expect(getByText('10 st')).toBeTruthy();
            expect(getByText('Product 2')).toBeTruthy();
            expect(getByText('456')).toBeTruthy();
            expect(getByText('20 st')).toBeTruthy();
        });
    });
});
