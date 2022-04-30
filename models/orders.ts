import config from "../config/config.json";
import Order from "../interfaces/order";
import OrderItems from "../interfaces/order_items";
import products from "./products";

const orders = {
    getOrders: async function getOrders(): Promis<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        //promise.all take array [] as argument
        await Promise.all(order.order_items.map(async (order_items:
        Partial<OrderItems>) => {
               let changedProduct = {
                   id: order_items.product_id,
                   name: order_items.name,
                   stock: order_items.stock-order_items.amount,
                   api_key: config.api_key,
               };
               await products.updateProduct(changedProduct);
        }));

        // TODO: Ändra status för ordern till packad
        // new order object after updated
       let changedOrder = {
           id: order.id,
           name: order.name,
           status_id : "200",
           api_key : config.api_key,
       };
       await orders.updateOrder(changedOrder);
   },
   // Take order object as argument
    updateOrder: async function updateOrder(order: Partial<Order>) {
       try {
           // take four arguments the request uri and the request body , headers and type
           await fetch(`${config.base_url}/orders?api_key=${config.api_key}`,{
           body: JSON.stringify(order),
           headers: {'content-type':'application/json'},
           method: 'PUT'});
       } catch (error) {
           console.log("Could not update the order");
       }
   },
};

export default orders;
