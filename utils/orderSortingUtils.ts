import * as OrderInterfaces from '../interfaces/Order';

export const isOrderPackable = (order: OrderInterfaces.Order) =>
    order.status_id === 100 &&
    order.order_items.length > 0 &&
    order.order_items.every(
        (item: OrderInterfaces.OrderItem) => item.stock >= item.amount,
    );

export const isOrderPacked = (order: OrderInterfaces.Order) =>
    order.status_id === 200;

export const isOrderSent = (order: OrderInterfaces.Order) =>
    [400, 600].includes(order.status_id);

export const isOrderReturned = (order: OrderInterfaces.Order) =>
    order.status_id === 800;

export const isOrderRefunded = (order: OrderInterfaces.Order) =>
    order.status_id === 900;

export const isOrderMissingItems = (order: OrderInterfaces.Order) =>
    order.status_id === 100 && order.order_items.length === 0;
