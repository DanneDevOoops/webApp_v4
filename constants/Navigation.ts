/**
 * @constant {Object} NavigationPathKeys
 * @description This constant defines the navigation keys for various screens in the application.
 * It is used to manage navigation paths and ensure consistency across the application.
 */
export const NavigationPathKeys = {
    /**
     * @namespace Auth
     * @description Navigation keys for authentication-related screens.
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
     * @description Navigation keys for delivery-related screens.
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
     * @description Navigation keys for home-related screens.
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
     * @description Navigation keys for invoice-related screens.
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
     * @description Navigation keys for order-related screens.
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
     * @description Navigation keys for product-related screens.
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
 * Bottom tabs navigator icons.
 */
export const routeIcons: { [key: string]: string } = {
    InvoicesScreen: 'file-invoice-dollar',
    HomeScreen: 'home',
    DeliveriesScreen: 'dolly',
    ProductsScreen: 'layer-group',
    OrderScreen: 'truck',
    AuthScreen: 'lock',
};
