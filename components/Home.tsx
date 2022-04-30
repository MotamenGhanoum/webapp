import { Image, Text, View, StyleSheet,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';


export default function Home({products, setProducts}) {

    return (
        <SafeAreaView style={Typography.container}>
            <ScrollView style={Base.base}>
                <Text style={Typography.header1}>Lager-Appen</Text>
                <Image source={warehouse} style={{ width: 320, height: 240, marginBottom: 28 }} />
                <Stock products={products} setProducts={setProducts} />
            </ScrollView>
        </SafeAreaView>
    );
}
