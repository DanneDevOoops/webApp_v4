import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';

// const OrderActionButton = ({
//     onPress,
//     text,
// }: {
//     onPress: () => void;
//     text: string;
// }) => (
//     <Pressable
//         style={({ pressed }) => ({
//             ...(Style.Button.buttonContainer as ViewStyle),
//             backgroundColor: pressed
//                 ? Style.Color.schemeOne.primary[200]
//                 : Style.Color.schemeOne.primary[300],
//         })}
//         onPress={onPress}>
//         <Text style={Style.Typography.buttonText as TextStyle}>{text}</Text>
//     </Pressable>
// );

export const OrderStatusMessage = (
    message: string,
    level: 'warning' | 'info' | 'success' | 'caution',
): React.ReactElement => {
    const styleSelection = {
        warning: {
            container: Style.Container.warningMsgContainer as ViewStyle,
            text: Style.Typography.warningFlashMsg as TextStyle,
        },
        info: {
            container: Style.Container.infoMsgContainer as ViewStyle,
            text: Style.Typography.infoFlashMsg as TextStyle,
        },
        success: {
            container: Style.Container.successMsgContainer as ViewStyle,
            text: Style.Typography.successFlashMsg as TextStyle,
        },
        caution: {
            container: Style.Container.cautionMsgContainer as ViewStyle,
            text: Style.Typography.cautionFlashMsg as TextStyle,
        },
    };

    const levelStyle = styleSelection[level];

    return (
        <View style={levelStyle.container}>
            <Text style={levelStyle.text}>{message}</Text>
        </View>
    );
};

// export const DynamicInteractionElement = ({
//     order,
//     appContext,
//     navigation,
// }: {
//     order: OrderInterfaces.Order;
//     appContext: any;
//     navigation: any;
// }): React.ReactElement => {
//     const orderIsPackable = useMemo(() => isOrderPackable(order), [order]);
//     const orderIsPacked: boolean = useMemo(() => isOrderPacked(order), [order]);
//     const orderIsSent: boolean = useMemo(() => isOrderSent(order), [order]);
//     const orderIsReturned: boolean = useMemo(
//         () => isOrderReturned(order),
//         [order],
//     );
//     const orderIsRefunded: boolean = useMemo(
//         () => isOrderRefunded(order),
//         [order],
//     );
//     const orderIsMissingItems: boolean = useMemo(
//         () => isOrderMissingItems(order),
//         [order],
//     );
//
//     if (orderIsPackable) {
//         return (
//             <OrderActionButton
//                 onPress={async () => {
//                     try {
//                         await OrderModel.pickOrder(order);
//                         const updatedProductsList =
//                             await ProductModel.getProducts();
//                         const updatedOrdersList = await OrderModel.getOrders();
//                         appContext.setProducts(updatedProductsList);
//                         appContext.setOrders(updatedOrdersList);
//                         await flash_message('success', 'Order har paketerats');
//                     } catch (error) {
//                         flash_message(
//                             'warning',
//                             'Order gick inte att paketera',
//                         );
//                     } finally {
//                         navigation.navigate('Orderlista', { reload: true });
//                     }
//                 }}
//                 text='Packetera Order'
//             />
//         );
//     } else if (orderIsPacked) {
//         return (
//             <View>
//                 <OrderActionButton
//                     onPress={async () => {
//                         try {
//                             await OrderModel.updateOrderStatus(
//                                 order.id,
//                                 order.name,
//                                 400,
//                             );
//                             showMessage({
//                                 message: `Order (${order.id}) har skickats`,
//                                 description: 'Order har skickats.',
//                                 type: 'success',
//                                 duration: 3500,
//                             });
//                             navigation.navigate('Orderlista', { reload: true });
//                         } catch (error) {
//                             console.error('Error sending order: ', error);
//                         }
//                     }}
//                     text='Skicka Order'
//                 />
//
//                 {OrderStatusMessage('Ordern är packeterad', 'info')}
//             </View>
//         );
//     } else if (orderIsSent) {
//         return (
//             OrderStatusMessage('Ordern har skickats till kund','success')
//         );
//     } else if (orderIsReturned) {
//         return (
//             OrderStatusMessage('Kunden har returnerat ordern.','info')
//         );
//     } else if (orderIsRefunded) {
//         return (
//             OrderStatusMessage('Ordern är återbetald', 'info')
//         );
//     } else if (!orderIsPackable && !orderIsMissingItems) {
//         return (
//             OrderStatusMessage(
//                 'Ordern går inte att packetera pga lagersaldo för en/flera av beställda ' +
//                 'produkter saknas.', 'warning'
//         );
//     } else if (orderIsMissingItems) {
//         return OrderStatusMessage('Order saknar produkter.', 'warning');
//     } else {
//         return OrderStatusMessage(
//             'Det är något gick fel på orderns status. Kontakta support!',
//             'warning',
//         );
//     }
// };
