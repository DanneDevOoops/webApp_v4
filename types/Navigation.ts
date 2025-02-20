

export type NavigationPathKeys = {
    Auth: {
        AuthScreen: string;
        Login: string;
        RegisterUser: string;
    };
    Delivery: {
        DeliveriesScreen: string;
        DeliveriesList: string;
        DeliverySpecification: string;
        DeliveryForm: string;
    };
    Home: {
        HomeScreen: string;
        Home: string;
    };
    Invoices: {
        InvoicesScreen: string;
        InvoicesList: string;
    };
}


export type RouteParams = {
    reload?: boolean;
};

// navigationTypes.ts
export type RootStackParamList = {
  'Faktura': undefined;
  'SignInForm': undefined;
  // Add other routes here
};


