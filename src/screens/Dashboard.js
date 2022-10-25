import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../config";

const Dashboard = () => {
  const [name, setName] = useState('')

  const changePassword = async () => {
    return await auth.sendPasswordResetEmail(auth.currentUser.email)
    .then(() => {
      alert('Reset de e-mail enviado para e-mail')
    }).catch((error) => {
      alert(error.message)
    })
  }

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
        style={{fontSize: 20, fontWeight: 'bold'}}
      >
        Olá, {name.firstName}
      </Text>

      <TouchableOpacity
        onPress={() => changePassword()}
        style={styles.button}
      >
        <Text
          style={{fontSize: 22, fontWeight: 'bold'}}
        >
          Alterar senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {auth.signOut()}}
        style={styles.button}
      >
        <Text
          style={{fontSize: 22, fontWeight: 'bold'}}
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
    marginTop: 100
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#00B37E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
})