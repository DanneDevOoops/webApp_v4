/**
 * @module app-provider.tsx
 *
 * This module defines the application-wide context and provides mechanisms
 * for managing and accessing application state such as loading indicators,
 * products, orders, deliveries, and invoices. It facilitates state management
 * across the application by providing a context provider and a custom hook.
 */

import React, { ReactElement, createContext, useState } from 'react';

import { AppContextType, AppProviderProps } from 'interfaces/app-interfaces';
import { Delivery } from 'interfaces/delivery-interfaces';
import { Invoice } from 'interfaces/invoice-interfaces';
import { Order } from 'interfaces/order-interfaces';
import { Product } from 'interfaces/product-interfaces';
import { UserPosition } from 'interfaces/user-interfaces';

/**
 * AppContext
 *
 * This context initializes with default values and provides types for the
 * application state management, including loading indicators, lists of products,
 * orders, deliveries, and invoices, along with functions to update these states.
 *
 * @context
 */
const AppContext = createContext<AppContextType>({
    // App data
    isLoading: false,
    setIsLoading(): void {
        return;
    },
    isRefreshing: false,
    setIsRefreshing: (): void => {
        return;
    },

    // Warehouse data
    products: [],
    setProducts: () => [],
    orders: [],
    setOrders: () => [],
    deliveries: [],
    setDeliveries: () => [],
    invoices: [],
    setInvoices: () => [],

    // User data
    userPosition: null,
    setUserPosition: (): void => {
        return;
    },
});

/**
 * AppProvider component.
 *
 * This component manages the application state, including loading indicators,
 * lists of products, orders, deliveries, and invoices. It provides functions to
 * update these states. Children components can access the application state and
 * functions through the `useAppContext` hook.
 *
 * @component
 * @param {AppProviderProps} props - The properties for the AppProvider component.
 * @returns {ReactElement} The provider component wrapping its children, providing them access
 * to the application context.
 */
export const AppProvider: React.FC<AppProviderProps> = ({
    children,
}: AppProviderProps): ReactElement => {
    // User interaction indicators
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    // API Objects
    const [products, setProducts] = useState<Product[] | null>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [deliveries, setDeliveries] = useState<Delivery[] | null>(null);
    const [invoices, setInvoices] = useState<Invoice[] | null>(null);
    const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

    return (
        <AppContext.Provider
            value={{
                isLoading,
                setIsLoading,
                isRefreshing,
                setIsRefreshing,

                products,
                setProducts,
                orders,
                setOrders,
                deliveries,
                setDeliveries,
                invoices,
                setInvoices,

                userPosition,
                setUserPosition,
            }}>
            {children}
        </AppContext.Provider>
    );
};

/**
 * useAppContext hook.
 *
 * A custom hook that provides access to the application context.
 * Components using this hook can access the current state and functions to update it.
 *
 * @returns {AppContextType} The application context, including the current state and related
 * functions.
 */
export const useAppContext = (): AppContextType => React.useContext(AppContext);
