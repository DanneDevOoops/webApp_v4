/**
 * @module constants/navigation-constants.ts
 *
 * This module stores constants related to navigation, including navigation keys and icons
 * for various screens in the application. It ensures consistency and manageability of
 * navigation paths across different sections such as authentication, deliveries, home,
 * invoices, orders, and products.
 */

/**
 * NavigationPathKeys
 *
 * This constant defines the navigation keys for various screens in the application.
 * It is organized into namespaces for different sections of the application, such as
 * authentication, deliveries, home, invoices, orders, and products.
 */
export const NavigationPathKeys = {
    /**
     * @namespace Auth
     * Navigation keys for authentication-related screens.
     */
    Auth: {
        /** @property {string} title - Key for the authentication screen key. */
        key: 'Auth',

        /** @property {string} title - Key for the authentication screen title. */
        title: 'Logga in',

        /** @property {string} AuthScreen - Key for the authentication screen. */
        AuthScreen: 'AuthScreen',

        /** @property {string} Login - Key for the login screen. */
        Login: 'SignInForm',

        /** @property {string} RegisterUser - Key for the user registration screen. */
        RegisterUser: 'RegisterNewUser',
    },

    /**
     * @namespace Delivery
     * Navigation keys for delivery-related screens.
     */
    Delivery: {
        /** @property {string} key - Key for the deliveries screen key. */
        key: 'Delivery',

        /** @property {string} title - Key for the deliveries screen title. */
        title: 'Inleveranser',

        /** @property {string} DeliveriesScreen - Key for the deliveries screen. */
        DeliveriesScreen: 'DeliveriesScreen',

        /** @property {string} DeliveriesList - Key for the deliveries list screen. */
        DeliveriesList: 'DeliveriesList',

        /** @property {string} DeliverySpecification - Key for the delivery specification screen. */
        DeliverySpecification: 'DeliverySpecification',

        /** @property {string} DeliveryForm - Key for the delivery form screen. */
        DeliveryForm: 'DeliveryForm',
    },

    /**
     * @namespace Home
     * Navigation keys for home-related screens.
     */
    Home: {
        /** @property {string} key - Key for the home screen key. */
        key: 'Home',

        /** @property {string} title - Key for the home screen title. */
        title: 'Hem',

        /** @property {string} HomeScreen - Key for the home screen. */
        HomeScreen: 'HomeScreen',

        /** @property {string} Home - Key for the home screen. */
        Home: 'Home',
    },

    /**
     * @namespace Invoices
     * Navigation keys for invoice-related screens.
     */
    Invoices: {
        /** @property {string} key - Key for the home screen key. */
        key: 'Invoices',

        /** @property {string} title - Key for the home screen title. */
        title: 'Fakturor',

        /** @property {string} InvoicesScreen - Key for the invoices screen. */
        InvoicesScreen: 'InvoicesScreen',

        /** @property {string} InvoicesList - Key for the invoices list screen. */
        InvoicesList: 'InvoicesList',

        /** @property {string} InvoiceSpecification - Key for the invoice specification screen. */
        InvoiceSpecification: 'InvoiceSpecification',

        /** @property {string} InvoiceForm - Key for the invoice form screen. */
        InvoiceForm: 'InvoiceForm',
    },

    /**
     * @namespace Orders
     * Navigation keys for order-related screens.
     */
    Orders: {
        /** @property {string} key - Key for the orders screen key. */
        key: 'Orders',

        /** @property {string} title - Key for the orders screen title. */
        title: 'Ordrar',

        /** @property {string} OrdersScreen - Key for the orders screen. */
        OrdersScreen: 'OrderScreen',

        /** @property {string} OrdersList - Key for the orders list screen. */
        OrdersList: 'OrderList',

        /** @property {string} OrderItem - Key for the order item screen. */
        OrderItem: 'OrderHandler',
    },

    /**
     * @namespace Products
     * Navigation keys for product-related screens.
     */
    Products: {
        /** @property {string} key - Key for the orders screen key. */
        key: 'Products',

        /** @property {string} title - Key for the orders screen title. */
        title: 'Produkter',

        /** @property {string} ProductsScreen - Key for the products screen. */
        ProductsScreen: 'ProductsScreen',

        /** @property {string} ProductsList - Key for the products list screen. */
        ProductsList: 'ProductsList',

        /** @property {string} ProductItem - Key for the product item screen. */
        ProductItem: 'ProductSpecification',
    },
};

/**
 * @type routeIcons
 *
 * This constant defines the icons for the bottom tabs navigator.
 * It maps screen keys to their corresponding icon names.
 */
export const routeIcons: { [key: string]: string } = {
    InvoicesScreen: 'file-invoice-dollar',
    HomeScreen: 'home',
    DeliveriesScreen: 'dolly',
    ProductsScreen: 'layer-group',
    OrderScreen: 'truck',
    AuthScreen: 'lock',
};
