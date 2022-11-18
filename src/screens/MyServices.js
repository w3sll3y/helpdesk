import { Text, StyleSheet, SafeAreaView, View , ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../config";

const MyServices = ({navigation}) => {

  const [name, setName] = useState('')
  const [currentPost, setCurrentPost] = useState({});
  const [allcoments, setAllcoments] = useState([]);

  useEffect(() => {
    db.collection('users')
    .doc(auth.currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        console.log(snapshot.data())
        setName(snapshot.data())
      }
      else {
        console.log('Usuario inexistente')
      }
    })

    db.collection('orders')
    .onSnapshot((snapshot) => {
      let dallcomments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      console.log(dallcomments)
      setAllcoments((prev) => [...prev, ...dallcomments])
    })
    
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ maxWidth: '90%', marginBottom: 20}}>
        {allcoments.map((person) => {
          return (
            <View style={{display: 'flex', flexDirection:'column', width: 200, color: 'white', marginBottom: 15}}>
              <Text style={{color: 'white', margin: 2}}>Oficia: {person.oficinaSelected} </Text>
              <Text style={{color: 'white', margin: 2}}>Veiculo: {person.serviceSelected}</Text>
              <Text style={{color: 'white', margin: 2}}>Servico: {person.typeService}</Text>
              <Text style={{color: 'white', margin: 2}}>Status: {person.status}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  )

}

export default MyServices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323238",
    padding: 5
  }
})