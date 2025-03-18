/**
 * @module types/navigation-types.ts
 *
 * Type definitions for navigation parameters used in the application.
 *
 * This module contains type definitions for route parameters and the root stack parameter list,
 * which are used for navigation within the application.
 */

import { ParamListBase } from '@react-navigation/native';

/**
 * Interface for route parameters, extending from ParamListBase.
 *
 * @property {Object} [params] - Optional parameters for the route.
 * @property {boolean} [params.reload] - Optional reload flag.
 * @property {never} [params.item] - Optional item parameter, which should never be used.
 */
export interface RouteParams extends ParamListBase {
    params?: {
        reload?: boolean;
        item?: never;
    };
}

/**
 * Type definition for the root stack parameter list.
 *
 * This type represents the possible routes and their parameters in the root stack navigator.
 *
 * @type RootStackParamList
 * @property {undefined} AuthScreen - Parameter for AuthScreen.
 * @property {undefined} RegisterNewUser - Parameter for RegisterNewUser.
 * @property {undefined} DeliveriesScreen - Parameter for DeliveriesScreen.
 * @property {undefined} DeliveriesList - Parameter for DeliveriesList.
 * @property {undefined} DeliverySpecification - Parameter for DeliverySpecification.
 * @property {undefined} DeliveryForm - Parameter for DeliveryForm.
 * @property {undefined} HomeScreen - Parameter for HomeScreen.
 * @property {undefined} Home - Parameter for Home.
 * @property {undefined} InvoicesScreen - Parameter for InvoicesScreen.
 * @property {undefined} InvoicesList - Parameter for InvoicesList.
 * @property {undefined} InvoiceSpecification - Parameter for InvoiceSpecification.
 * @property {undefined} InvoiceForm - Parameter for InvoiceForm.
 * @property {undefined} OrderScreen - Parameter for OrderScreen.
 * @property {undefined} OrderList - Parameter for OrderList.
 * @property {undefined} OrderHandler - Parameter for OrderHandler.
 * @property {undefined} ProductsScreen - Parameter for ProductsScreen.
 * @property {undefined} ProductsList - Parameter for ProductsList.
 * @property {undefined} ProductSpecification - Parameter for ProductSpecification.
 * @property {undefined} SignInForm - Parameter for SignInForm.
 */
export type RootStackParamList = {
    AuthScreen: undefined;
    RegisterNewUser: undefined;
    DeliveriesScreen: undefined;
    DeliveriesList: undefined;
    DeliverySpecification: undefined;
    DeliveryForm: undefined;
    HomeScreen: undefined;
    Home: undefined;
    InvoicesScreen: undefined;
    InvoicesList: undefined;
    InvoiceSpecification: undefined;
    InvoiceForm: undefined;
    OrderScreen: undefined;
    OrderList: undefined;
    OrderHandler: undefined;
    ProductsScreen: undefined;
    ProductsList: undefined;
    ProductSpecification: undefined;
    SignInForm: undefined;
};
