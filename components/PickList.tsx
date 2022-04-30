import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const productsHash = productsList.reduce((hash, current) =>({...hash,
        [current.id]: current.stock}), {} );
    let inStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id]<item.amount) {
            inStock = false;
        }

        return <Text
                style={{ ...Typography.itemsStyle }}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View style={{ ...Typography.container }}>
            <View style={{...Typography.address}}>
                <Text style={{...Typography.normal}}>{order.name}</Text>
                <Text style={{...Typography.normal}}>{order.address}</Text>
                <Text style={{...Typography.normal}}>{order.zip} {order.city}</Text>
            </View>


            <Text style={{ ...Base.header3 }}>Produkter:</Text>

            {orderItemsList}

            <Button title="Plocka order" onPress={pick} />
        </View>
    )
};
