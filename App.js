import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInputMask } from 'react-native-masked-text';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [base, setBase] = useState(null);
  const [altura, setAltura] = useState(null);
  let area = ((base*altura)/2).toFixed(2);

  function calcularArea() {
    if(base == null || altura == null) {
      Alert.alert('Alerta', 'Preencha todos os campos para realizar o cálculo!');
    } else if(base != null && altura != null) {
      Alert.alert('Área', 'A área do triângulo é: ' + area);
    }
    setBase(null);
    setAltura(null);
  }

  return (
    <View style={styles.container}>
      

      <View style={styles.form}>
        <Text style={styles.titulo}>Calcular Área do Triângulo</Text>

        <View>
          <Text style={styles.inputText}>Base</Text>
          <TextInputMask
          type={'custom'}
          options={{
            mask: '99.99'
          }}
          placeholder='Ex: 12.38'
          keyboardType={'numeric'}
          value={base}
          onChangeText={base => setBase(base)}
          style={styles.input}
          />

          <Text style={styles.inputText}>Altura</Text>
          <TextInputMask
          type={'custom'}
          options={{
            mask: '99.99'
          }}
          placeholder='Ex: 20.52'
          keyboardType={'numeric'}
          value={altura}
          onChangeText={altura => setAltura(altura)}
          style={styles.input}
          />
        </View>
        
        <Button
        color={'purple'}
        title='Calcular'
        onPress={calcularArea}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "purple",
    marginBottom: 30,
  },

  form: {
    alignItems: 'center',
    marginTop: 30,
    height: 248,
    width: Dimensions.get('window').width,
    backgroundColor: "#F0F0F0",
    borderRadius: 10
  },

  inputText: {
    fontSize: 18,
    fontWeight: "500",
  },

  input: {
    width: 250,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "purple"
  },


});
