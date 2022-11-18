import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import { db, auth } from "./config";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Dashboard from "./src/screens/Dashboard";
import Header from "./src/components/Header";
import CarScreen from './src/screens/CarScreen'
import MotoScreen from "./src/screens/MotoScreen";
import BikeScreen from "./src/screens/BikeScreen";
import Comments from "./src/screens/Comments";
import MyServices from "./src/screens/MyServices";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); 

  if (initializing) return null;

  if(!user) {
    return(
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Help Desk" />,
            headerStyle: {
              height: 150,
              backgroundColor: '#121214',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{
            headerLeft: ()=> null,
            headerTitle: () => <Header name="Help Desk" />,
            headerStyle: {
              height: 150,
              backgroundColor: '#121214',
              shadowColor: '#000',
              elevation: 25,
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return(
    <Stack.Navigator>
      <Stack.Screen 
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: () => <Header name="Dashboard" />,
            headerStyle: {
              height: 150,
              backgroundColor: '#121214',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />

      <Stack.Screen 
        name="CarScreen"
        component={CarScreen}
        options={{
          headerLeft: ()=> null,
          headerTitle: () => <Header name="Carros" />,
          headerStyle: {
            height: 150,
            backgroundColor: '#121214',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />

      <Stack.Screen 
        name="MotoScreen"
        component={MotoScreen}
        options={{
          headerLeft: ()=> null,
          headerTitle: () => <Header name="Motos" />,
          headerStyle: {
            height: 150,
            backgroundColor: '#121214',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />

      <Stack.Screen 
        name="BikeScreen"
        component={BikeScreen}
        options={{
          headerLeft: ()=> null,
          headerTitle: () => <Header name="Bicicletas" />,
          headerStyle: {
            height: 150,
            backgroundColor: '#121214',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />

    <Stack.Screen 
        name="MyServices"
        component={MyServices}
        options={{
          headerLeft: ()=> null,
          headerTitle: () => <Header name="Meus servicos" />,
          headerStyle: {
            height: 150,
            backgroundColor: '#121214',
            shadowColor: '#000',
            elevation: 25
          }
        }}
      />

    <Stack.Screen 
      name="Comments"
      component={Comments}
      options={{
        headerLeft: ()=> null,
        headerTitle: () => <Header name="Comentarios" />,
        headerStyle: {
          height: 150,
          backgroundColor: '#121214',
          shadowColor: '#000',
          elevation: 25
        }
      }}
    />
    </Stack.Navigator>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}