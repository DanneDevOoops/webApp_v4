/**
 * @module app-interfaces.ts
 *
 * This module defines the interfaces for the application's global state management.
 * It includes interfaces for managing loading indicators, and the state for products, orders,
 * deliveries, and invoices.
 */

import { ReactNode } from 'react';

import * as DeliveriesInterfaces from './delivery-interfaces';
import * as InvoicesInterfaces from './invoice-interfaces';
import * as OrdersInterfaces from './order-interfaces';
import * as ProductsInterfaces from './product-interfaces';
import { UserPosition } from './user-interfaces';

/**
 * Defines the structure for the application contexts.
 *
 * This interface outlines the types and functions available for managing the application's
 * global state, including loading indicators, and the state for products, orders, deliveries,
 * and invoices.
 *
 * @interface AppContextType
 * @property {boolean} isLoading - Indicates if the application is currently loading.
 * @property {Function} setIsLoading - Function to set the loading state.
 * @property {boolean} isRefreshing - Indicates if the application is currently refreshing data.
 * @property {Function} setIsRefreshing - Function to set the refreshing state.
 * @property {ProductsInterfaces.Product[] | null} products - The current list of products or
 * null if not loaded.
 * @property {Function} setProducts - Function to update the list of products.
 * @property {OrdersInterfaces.Order[] | null} orders - The current list of orders or null if
 * not loaded.
 * @property {Function} setOrders - Function to update the list of orders.
 * @property {DeliveriesInterfaces.Delivery[] | null} deliveries - The current list of
 * deliveries  or null if not loaded.
 * @property {Function} setDeliveries - Function to update the list of deliveries.
 * @property {InvoicesInterfaces.Invoice[] | null} invoices - The current list of invoices or
 * null if not loaded.
 * @property {Function} setInvoices - Function to update the list of invoices.
 * @property {UserPosition | null} userPosition - The current user position or null if not set.
 * @property {Function} setUserPosition - Function to update the user position.
 */
export interface AppContextType {
    // Loading state
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isRefreshing: boolean;
    setIsRefreshing: (isRefreshing: boolean) => void;

    // products
    products: ProductsInterfaces.Product[] | null;
    setProducts: (products: ProductsInterfaces.Product[] | null) => void;

    // orders
    orders: OrdersInterfaces.Order[] | null;
    setOrders: (orders: OrdersInterfaces.Order[] | null) => void;

    // delivery
    deliveries: DeliveriesInterfaces.Delivery[] | null;
    setDeliveries: (deliveries: DeliveriesInterfaces.Delivery[] | null) => void;

    // invoices
    invoices: InvoicesInterfaces.Invoice[] | null;
    setInvoices: (invoices: InvoicesInterfaces.Invoice[] | null) => void;

    userPosition: UserPosition | null;
    setUserPosition: (userPosition: UserPosition | null) => void;
}

/**
 * Defines the properties for the `AppProvider` component.
 *
 * This interface outlines the properties that can be passed to the `AppProvider` component.
 *
 * @interface AppProviderProps
 * @property {ReactNode} children - The child components that will have access to the contexts.
 */
export interface AppProviderProps {
    children: ReactNode;
}
