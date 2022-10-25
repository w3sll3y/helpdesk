import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { db, auth } from "../../config";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  registerUser = async (email, password, firstName, lastName) => {
    await auth.createUserWithEmailAndPassword(email, password) 
    .then(() => {
      auth.currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://helpdesk-90e51.firebaseapp.com',
      })
      .then(() => {
        alert('Verifique e-mail')
      }).catch((error) => {
        alert(error.message)
      })
      .then(() => {
        db.collection('users')
        .doc(auth.currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    })
    .catch((error) => {
      alert(error.message)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', 'fontSize': 23}}>
        Registrar aqui!
      </Text>
      <View style={{marginTop: 40}}>
        <TextInput 
          style={styles.textInput}
          placeholder="Primeiro Nome"
          onChangeText={(firstName) => setfirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Sobrenome"
          onChangeText={(lastName) => setlastName(lastName)}
          autoCorrect={false}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22}}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold', fontSize: 16}}>Já tem conta? Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: '90%'
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