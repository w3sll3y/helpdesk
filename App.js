import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import { db, auth } from "./config";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Dashboard from "./src/screens/Dashboard";
import Header from "./src/components/Header";

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
              backgroundColor: '#29292E',
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
              backgroundColor: '#29292E',
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
              backgroundColor: '#29292E',
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