/// En este se importan los modulos necesarios para que la aplicacion funcione
import React from "react";

import {StyleSheet, Image, View, Text, Dimensions} from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator }  from "@react-navigation/stack";


import OasisHomeSearch from "./src/screens/OasisHomeSearch"; // Ruta relativa dde donde se encuentra 
import OasisSearchResults from "./src/screens/OasisSearchResults";

const { width, height} = Dimensions.get("window");
// Crear nuestras navegacion basada en stack (pilas)

const Stack = createStackNavigator();


function HeaderHome(){
  return(
    <View>
      <View>
      <Image source={require("./assets/logo.png")} style = {styles.oasisImage}/>
    
      <Text style= {{marginTop: 20}} style={styles.eslogan}>Encuentra tu serenidad</Text>
      </View>
       
     
    </View>
   
  );
}

export default function App() {
  /// Vamos a retorna dicha pantalla  como un componente <>
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeSearch">
        <Stack.Screen name ="HomeSearch" component ={OasisHomeSearch} 
        options={{ headerTitle: props => <HeaderHome {...props}/>, headerStyle: {
          backgroundColor: "#eb9284",
        } }}/>
        <Stack.Screen name ="SearchResults" component = {OasisSearchResults} options={{ title: "Destinos Encontrados",
      headerStyle: {
        backgroundColor: "#eb9284",
      } }}/>
      </Stack.Navigator>
    </NavigationContainer>

  )

}

const styles = StyleSheet.create({
  oasisImage :{
      width: 60,
      height: 60,
      marginRight: 120,
      marginTop: -16,
      marginLeft: 10
      //resizeMode: "header",
  },
  eslogan: {
      color: "#07263c",
      justifyContent: "center",
      marginRight: 5,
      marginTop: -45,
      marginLeft: 90,
      fontSize: 23,
      fontStyle: "italic"
    }
  });
