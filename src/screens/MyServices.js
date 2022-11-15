import { Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../config";
import { doc, getDoc  } from 'firebase/firestore'
// import { FlatList } from "react-native-gesture-handler";

const MyServices = ({navigation}) => {

  const [orders, setOrders] = useState([])

  let loadList = async () => {
    const docRef = doc(db, "orders");
    const docSnap = await getDoc(docRef);

    const servicos = docSnap.data();
    setOrders(servicos)
    console.log('===============')
    console.log(servicos)
  }

  useEffect(() => {
    loadList()
  },[])

  // , where("userId", "==", auth.currentUser.uid)
  // useEffect(() => {
  //   const orders = db.collection('orders').onSnapshot(querySnapshot => {
  //     const data = querySnapshot.docs.map(doc => {
  //       return {
  //         ...doc.data()
  //       }
  //     })
  //     setOrders(data)
  //   })
  //   return () => orders()
  // }, [])

  // useEffect(() => {
  //   db.collection('orders')
  //   .doc(auth.currentUser.uid).get()
  //   .then((snapshot) => {
  //     if(snapshot.exists) {
  //       setOrders(snapshot.data())
  //     }
  //     else {
  //       console.log('Cadastros inexistentes')
  //     }
  //   })
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text 
        style={{fontSize: 20, fontWeight: 'bold', marginTop: 50, color: "white"}}
      >
                Olá, {orders.status}
      </Text>
      
      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
      />
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

}

export default MyServices

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