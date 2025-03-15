// import React, { ReactElement, useEffect, useState } from 'react';
// import Picker from 'react-native-picker';
// import { useAppContext } from '../../context/App.provider';
// import * as InvoiceInterfaces from '../../interfaces/invoice';
// import * as OrderInterfaces from '../../interfaces/order';
// import * as OrderModel from '../../models/orders';
//
// /**
//  * Picker Component for product to add to a new delivery.
//  *
//  * @constructor
//  * @param props
//  */
// export const InvoiceOrderPicker: (
//     props: InvoiceInterfaces.NewInvoice,
// ) => ReactElement = (props: InvoiceInterfaces.NewInvoice): ReactElement => {
//     const appContext = useAppContext();
//     const [packedOrders, setPackedOrders] = useState<OrderInterfaces.order[]>(
//         [],
//     );
//     const [selectedOrder, setSelectedOrder] =
//         useState<OrderInterfaces.order | null>(null);
//
//     useEffect((): void => {
//         async function loadOrdersAndFilterThem() {
//             // Get all orders from API and store to state.
//             appContext.setOrders(await OrderModel.getOrders());
//
//             // Filter orders to only show orders that are packed.
//             setPackedOrders(
//                 appContext.orders.filter(
//                     (order: OrderInterfaces.order): boolean => {
//                         return order.status_id === 200;
//                     },
//                 ),
//             );
//
//             setSelectedOrder(packedOrders[0]);
//         }
//
//         void loadOrdersAndFilterThem();
//     }, []);
//
//     return (
//         <Picker>
//             <Picker.Item
//                 key={101}
//                 label={'Java'}
//                 value={'java'}
//             />
//             <Picker.Item
//                 key={102}
//                 label={'Java'}
//                 value={'java'}
//             />
//         </Picker>
//     );
// };
