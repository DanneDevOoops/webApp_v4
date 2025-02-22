import { ParamListBase } from '@react-navigation/native';

export interface RouteParams extends ParamListBase {
    params?: {
        reload?: boolean;
        item?: never;
    };
}

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
