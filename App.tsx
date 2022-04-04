import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import warehouse from './assets/warehouse.jpg';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.bass}>
            <Text style={styles.title}>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 340, height: 240 }} />
            <Stock />
            <StatusBar style="auto" />
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: '#eaeaea',
    alignItems: 'center', justifyContent: 'center'
  },

  base: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    paddingLeft: 12,
    paddingRight: 12,
},
title: {
    marginTop: 1,
    padding: 5,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 10,
  },
});
