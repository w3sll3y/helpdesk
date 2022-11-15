import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {auth} from '../../config'
import * as AuthSession from 'expo-auth-session';
import {GoogleAuthProvider } from 'firebase/auth' 

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleGoogleSignIn() {
    const CLIENT_ID = '898735093560-8oi5vm5k1978ffhse7r3l1k7v8mj5jca.apps.googleusercontent.com'
    const REDIRECT_URI = 'https://auth.expo.io/@w3sll3yfacul/helpdesk'
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    const response = await AuthSession.startAsync({ authUrl });
    console.log(response)
    const {type, params} = await AuthSession
      .startAsync({authUrl})
    
      if( type === 'success') {
        const provider = new GoogleAuthProvider();
        try{ 
          await auth.signInWithRedirect(params.acess_token, provider)
        }
        catch (error) {
          alert(error.message)
        }
      }
  }
  
  loginUser = async (email, password) => {
    try{ 
      await auth.signInWithEmailAndPassword(email, password)
    }
    catch (error) {
      alert(error.message)
    }
  }

  const forgotPassword = () => {
    auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Reset de senha enviado')
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 26, marginTop: 100, color: "white"}}>
        Login
      </Text>
      <View style={{marginTop: 40}}>
        <TextInput 
          style={styles.textInput}
          placeholder='E-mail'
          placeholderTextColor="#c8c8c8"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput 
          style={styles.textInput}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          placeholderTextColor="#c8c8c8"
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoogleSignIn}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Login Google</Text>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold', fontSize: 16, color: "white"}}>Não tem conta? Registar-se</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {forgotPassword()}}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: -10, color: "white"}}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#323238"
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
    maxWidth: '90%',
    color: "white"
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