/// En este se importan los modulos necesarios para que la aplicacion funcione
import React from "react";

import {StyleSheet, Image, View, Text, Dimensions} from "react-native";

// Importa componentes de navegacion entre pantallas
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator }  from "@react-navigation/stack";

// importacion de las pantallas creaadas en src/screens/

import OasisHomeSearch from "./src/screens/OasisHomeSearch"; // Ruta relativa dde donde se encuentra 
import OasisSearchResults from "./src/screens/OasisSearchResults";
import OasisInfoHotels from "./src/screens/OasisInfoHotels";
import OasisHotelDetails from "./src/screens/OasisHotelDetails";
import OasisGalleryHotel from "./src/screens/OasisGalleryHotel";

// Variables para mostrar las dimensiones que tendran algunos componentes

const { width, height} = Dimensions.get("window");

// Crear nuestras navegacion basada en stack (pilas)

const Stack = createStackNavigator();

// Funcion para mostrar un header personalizado de la primera pantalla

function HeaderHome(){
  return(
    <View style={{flex:1, marginTop: 5}}>
      <View>
      <Image source={require("./assets/LogoFlor.png")} style = {styles.oasisImage}/>
    
      <Text style= {{marginTop: 20}} style={styles.eslogan}>Find your Serenity</Text>
      </View>
    </View>
   
  );
}

// importacion de las pantalla para ser ejecutadas
export default function App() {
  /// Return para mostrar las pantallas creadas
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeSearch">
        <Stack.Screen name ="HomeSearch" component ={OasisHomeSearch} 
        options={{ headerTitle: props => <HeaderHome {...props}/>, headerStyle: {
          backgroundColor: "#eb9284"
        } }}/>
        <Stack.Screen name ="SearchResults" component = {OasisSearchResults} options={{ title: "Destinations Found",
      headerStyle: {
        backgroundColor: "#eb9284"
      } }}/>
      <Stack.Screen name ="InfoHotels" component = {OasisInfoHotels} options={{ title: "Hotels Found",
      headerStyle: {
        backgroundColor: "#eb9284"
      } }}/>

      <Stack.Screen name ="HotelDetails" component = {OasisHotelDetails} options={{ title: "Hotel Details",
      headerStyle: {
        backgroundColor: "#eb9284"
      } }}/>

      <Stack.Screen name = "GalleryHotel" component  = {OasisGalleryHotel} options={{ title: "Gallery Hotel",
      headerStyle: {
        backgroundColor: "#eb9284"
      }}}/>
      </Stack.Navigator>
    </NavigationContainer>

  )

}

// Estilos para la funciones creadas anteriomente
const styles = StyleSheet.create({

  // Personalizacion de la imagen que se mostrara en el header
  oasisImage :{
      width: width * 0.10,
      height: height * 0.077,
      marginRight: 120,
      marginTop: -16,
      marginLeft: 30,
      flex: 1
  },
  
 // Estilo de letra de eslogan   
  eslogan: {
      color: "#07263c",
      justifyContent: "center",
      marginRight: 5,
      marginTop: -40,
      marginLeft: 115,
      fontSize: 23,
      fontWeight: "bold",
      flex:1,
      fontStyle: "italic"
    }
  });
