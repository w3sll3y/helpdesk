import { db } from "../../config";

import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker"; 
import { SafeAreaView } from "react-native-safe-area-context";

const CarScreen = ({navigation}) => {
  const [oficina] = useState(['Oficina do Mario', 'Oficina do Ze'])
  const [oficinaSelected, setOficinaSelected] = useState('Oficina do Mario')

  const [service] = useState(['Lava Jato', 'Troca de oleo', 'Troca de pneu', 'Revisao'])
  const [serviceSelected, setServiceSelected] = useState('Lava Jato')

  function handleNewOrder(){

    db.collection('orders')
    .add({
      typeService: 'Car',
      oficinaSelected,
      serviceSelected,
      status: 'open',
    })
    .then(() => Alert.alert("Chamado", "Chamado cadastrado!"))
    .catch((error) => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', 'fontSize': 23, marginTop: 20, color: "white"}}>
        CARRO
      </Text>

      <SafeAreaView style={styles.containerOficina}>
        <View>
          <Text style={{color: 'white', fontWeight:'bold', fontSize: 16}}> Selecione a Oficina:</Text>
          <Picker
            selectedValue={oficinaSelected}
            onValueChange={(itemValue) => 
              setOficinaSelected(itemValue)
            }>
            {
              oficina.map(of => {
                return <Picker.Item label={of} value={of} style={{width: "60%"}}/>
              })
            }
          </Picker>
        </View>

        <View>
          <Text style={{color: 'white', fontWeight:'bold', fontSize: 16}}> Selecione o servico:</Text>
          <Picker
            selectedValue={serviceSelected}
            onValueChange={(itemValue) => 
              setServiceSelected(itemValue)
            }>
            {
              service.map(serv => {
                return <Picker.Item label={serv} value={serv} style={{width: "60%"}}/>
              })
            }
          </Picker>
        </View>
      </SafeAreaView>

      <TouchableOpacity
        onPress={handleNewOrder}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#323238"
  },
  containerOficina: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    width: "100%",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    color: "white",
    textAlign: 'center',
    maxWidth: '90%'
  },
  button: {
    marginTop: 10,
    height: 70,
    width: 250,
    backgroundColor: '#00B37E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
})