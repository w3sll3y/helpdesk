import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../config";

const Dashboard = ({navigation}) => {

  const [name, setName] = useState('')

  // const changePassword = async () => {
  //   return await auth.sendPasswordResetEmail(auth.currentUser.email)
  //   .then(() => {
  //     alert('Reset de e-mail enviado para e-mail')
  //   }).catch((error) => {
  //     alert(error.message)
  //   })
  // }

  useEffect(() => {
    db.collection('users')
    .doc(auth.currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        setName(snapshot.data())
      }
      else {
        console.log('Usuario inexistente')
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text 
        style={{fontSize: 20, fontWeight: 'bold', marginTop: 50, color: "white"}}
      >
        Olá, {name.firstName}
      </Text>
      <SafeAreaView style={styles.containerServices}>
        <TouchableOpacity
          style={styles.services}
          onPress={() => navigation.navigate('MyServices')}
        >
          <Text style={{fontWeight:'bold', fontSize: 16}}>Meus servicos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.services}
          onPress={() => navigation.navigate('CarScreen')}
        >
          <Text style={{fontWeight:'bold', fontSize: 16}}>Carro</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView style={styles.containerServices}>
        <TouchableOpacity
          style={styles.services}
          onPress={() => navigation.navigate('MotoScreen')}
        >
          <Text style={{fontWeight:'bold', fontSize: 16}}>Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.services}
          onPress={() => navigation.navigate('BikeScreen')}
        >
          <Text style={{fontWeight:'bold', fontSize: 16}}>Bicicleta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    
      <TouchableOpacity
        onPress={() => {auth.signOut()}}
        style={styles.button}
      >
        <Text
          style={{fontSize: 16, fontWeight: 'bold', color: "white"}}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#323238"
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  containerServices: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "85%",
    color: "white"
  },
  services: {
    height: 80,
    width: 150,
    backgroundColor: '#00B37E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    color: "white"
  }
})