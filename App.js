/// En este se importan los modulos necesarios para que la aplicacion funcione
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator }  from "@react-navigation/stack";


import OasisHomeSearch from "./src/screens/OasisHomeSearch"; // Ruta relativa dde donde se encuentra 


import OasisSearchResults from "./src/screens/OasisSearchResults";


export default function App() {
  /// Vamos a retorna dicha pantalla  como un componente <>
  return <OasisHomeSearch></OasisHomeSearch>

    // return <OasisSearchResults></OasisSearchResults>

}
