/**
 * This module defines the application-wide context and provides mechanisms
 * for managing and accessing application state such as loading indicators,
 * products, orders, deliveries, and invoices. It facilitates state management
 * across the application by providing a context provider and a custom hook.
 */
import React, { createContext, ReactElement, useState } from 'react';
import { AppContextType, AppProviderProps } from '../interfaces/app-interfaces';
import { Delivery } from '../interfaces/delivery-interfaces';
import { Order } from '../interfaces/order-interfaces';
import { Product } from '../interfaces/product-interfaces';
import { Invoice } from '../interfaces/invoice-interfaces';
import { UserPosition } from '../interfaces/user-interfaces';

/**
 * `AppContextType` is a React context object initialized with default values for
 * application state management, including loading indicators, lists of products,
 * orders, deliveries, and invoices, along with functions to update these states.
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
 * `AppProvider` is a React functional component that wraps its children with the
 * `AppContextType.Provider`, allowing them to access and manipulate the application's
 * state such as loading indicators, products, orders, deliveries, and invoices.
 *
 * @param children - The child components that will have access
 * to the context.
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
 * `useAppContext` is a custom hook that allows components to access the application
 * context. It returns the context value, providing access to the application's state
 * and functions to manipulate it.
 *
 * @returns {AppContextType} The application context value.
 */
export const useAppContext = (): AppContextType => React.useContext(AppContext);
