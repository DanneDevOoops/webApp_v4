// import React, { ReactElement } from 'react';
// import { Text, TextStyle, View, ViewStyle } from 'react-native';
// import * as Style from '../../assets/styles';
// import { order } from '../../interfaces/order';
//
// /**
//  * OrderDetails component
//  * @param order
//  * @param dynamicInteractionElement
//  * @constructor
//  * @return {ReactElement} OrderDetails component
//  * @function
//  * @exports OrderDetails - Component
//  */
// export const OrderDetails = ({
//     order,
//     dynamicInteractionElement,
// }: {
//     order: order;
//     dynamicInteractionElement: ReactElement;
// }): ReactElement => {
//     return (
//         <View style={Style.Container.content}>
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     order ID:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.id}
//                 </Text>
//             </View>
//
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Status:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.status}
//                 </Text>
//             </View>
//
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Status kod:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.status_id}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Kund:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.name}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Address:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.address}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Postkod:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.zip}
//                 </Text>
//             </View>
//             <View style={Style.Container.grid.row}>
//                 <Text style={Style.Typography.dataLeft}>
//                     Stad:{' '}
//                 </Text>
//                 <Text style={Style.Typography.dataRight}>
//                     {order.city}
//                 </Text>
//             </View>
//             {dynamicInteractionElement}
//         </View>
//     );
// };
