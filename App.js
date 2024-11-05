
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ActN from "./components/Base"
import ActividadQueSoy from './components/Home';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ActividadQueSoy />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});