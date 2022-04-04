import { StatusBar } from 'expo-status-bar';
import { useState, useEffect  } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setProducts(result.data));
      }, []);
    const list = products.map((product, index) => <Text style={styles.itemsStyle} key={index}>{ product.name } - { product.stock }</Text>);
    return (
    <View>
      {list}
    </View>
  );
}


export default function Stock() {
  return (
      <SafeAreaView>
          <View>
              <Text style={{color: 'red', fontSize: 24, paddingBottom: 20,
              paddingLeft: 0}}>Lagerförteckning:</Text>
              <StockList/>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    itemsStyle: {
        padding: 5,
        backgroundColor: '#61dafb',
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
});
