// import React, { ReactElement } from 'react';
// import { Text, TextStyle, View, ViewStyle } from 'react-native';
// import * as Style from '../../assets/styles';
// import { Order } from '../../interfaces/Order';
//
// /**
//  * OrderDetails component
//  * @param order
//  * @param dynamicInteractionElement
//  * @constructor
//  * @return {ReactElement} OrderDetails component
//  * @component
//  * @exports OrderDetails - Component
//  */
// export const OrderDetails = ({
//     order,
//     dynamicInteractionElement,
// }: {
//     order: Order;
//     dynamicInteractionElement: ReactElement;
// }): ReactElement => {
//     return (
//         <View style={Style.Container.content as ViewStyle}>
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Order ID:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.id}
//                 </Text>
//             </View>
//
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Status:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.status}
//                 </Text>
//             </View>
//
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Status kod:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.status_id}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Kund:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.name}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Address:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.address}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Postkod:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.zip}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row as ViewStyle}>
//                 <Text style={Style.Typography.dataLeft as TextStyle}>
//                     Stad:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight as TextStyle}>
//                     {order.city}
//                 </Text>
//             </View>
//             {dynamicInteractionElement}
//         </View>
//     );
// };
