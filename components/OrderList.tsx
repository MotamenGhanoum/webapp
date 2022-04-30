import { useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography } from '../styles';

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <View style={{ ...Typography.button }}>
             <Button
                title={order.name}
                key={index}
                color = 'black'
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
           </View>
        });

    return (
        <View>
            <Text style={{ ...Base.header2 }} >Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
