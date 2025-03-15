// import { ReactElement } from 'react';
//
// /**
//  * Function to check product stock.
//  *
//  * This function checks the stock status of a product in an order. It returns a React element that displays
//  * the product's stock status based on the stock level vs. order amount. The stock status is indicated by
//  * different colors and messages.
//  *
//  * @param {OrderInterfaces.OrderItemType} orderItem - The order item to check the stock status for.
//  * @returns {ReactElement} A React element displaying the product's stock status.
//  */
// export const ProductStockStatus = ({
//     orderItem,
// }: {
//     orderItem: OrderInterfaces.OrderItemType;
// }): ReactElement => {
//     const computedData = useMemo(() => {
//         const data = { color: '', icon: 'boxes', text: '' };
//         if (orderItem.amount <= orderItem.stock - 10) {
//             data.color = Style.Color.indicator.positive[300];
//             data.text = `Produkten ${orderItem.name} finns i lager.`;
//         } else if (
//             orderItem.amount > orderItem.stock - 10 &&
//             orderItem.amount <= orderItem.stock
//         ) {
//             data.color = Style.Color.indicator.caution[300];
//             data.text = `Produkten ${orderItem.name} finns i lager men saldot är lågt.`;
//         } else {
//             data.color = Style.Color.indicator.warning[300];
//             data.text = `Produkten ${orderItem.name} saknar täckning för ordern i lagersaldot (${orderItem.stock}).`;
//         }
//         return data;
//     }, [orderItem]);
//
//     return (
//         <View style={Style.Container.grid.row as ViewStyle}>
//             <View style={Style.Container.grid.col[1] as ViewStyle}>
//                 <Text> </Text>
//             </View>
//             <View style={Style.Container.grid.col[7] as ViewStyle}>
//                 <View style={Style.Container.grid.row as ViewStyle}>
//                     <FontAwesome5
//                         name={computedData.icon}
//                         size={20}
//                         color={computedData.color}
//                         style={Style.Container.grid.col[1] as ViewStyle}
//                     />
//                     <Text
//                         style={
//                             {
//                                 fontStyle: 'italic',
//                                 fontSize: Style.Typography.fontSize.text,
//                                 color: computedData.color,
//                             } as TextStyle
//                         }>
//                         {computedData.text}
//                     </Text>
//                 </View>
//             </View>
//         </View>
//     );
// };
