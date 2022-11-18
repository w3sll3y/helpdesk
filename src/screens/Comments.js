import { db, auth } from "../../config";

import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

const Comments = ({navigation}) => {

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

    db.collection('comments')
    .onSnapshot((snapshot) => {
      let dallcomments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      console.log(dallcomments)
      setAllcoments((prev) => [...prev, ...dallcomments])
    })
    
  }, [])


  const [comment, setComment] = useState('')

  function handleNewComment(){

    db.collection('comments')
    .add({
      authorComment: name.firstName,
      comment
    })
    .then(() => Alert.alert("Chamado", "Chamado cadastrado!"))
    .catch((error) => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold', 'fontSize': 23, marginTop: 20, color: "white"}}>
        Comentarios
      </Text>
      <ScrollView style={{maxHeight: 250, marginLeft: 0, width: '90%', marginBottom: 20}}>
        <View>
          {allcoments.map((person) => {
            return (
              <View style={{display: 'flex', flexDirection:'row', margin: 2, width: 200, color: 'white', }}>
                <Text style={{color: 'white'}}>{person.authorComment}: </Text>
                <Text style={{color: 'white'}}>{person.comment}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      
      <View style={{backgroundColor: 'white', width: '90%'}}>
        <TextInput 
          multiline={true}
          numberOfLines={10}
          onChangeText={(comment) => setComment(comment)}
          autoCorrect={false}
          placeholder="Comentar"
          style={{ height:200, textAlignVertical: 'top'}}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleNewComment()}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize: 22, color: "white"}}>Registrar</Text>
      </TouchableOpacity>
    </View>
  )

}

export default Comments

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
    backgroundColor: '#00B37E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
})