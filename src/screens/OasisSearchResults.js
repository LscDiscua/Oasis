/* Segunda Pantalla de la Aplicacion Osasis Search Results
   donde se mostrara una lista de destinos con respecto a la ubicacion 
   que se haya ingresado en la primera pantalla.*/

/* Se importan los modulos necesarios para la pantalla */

import React, {useEffect, useState} from "react"

import { StyleSheet, View, Text, FlatList,Dimensions} from "react-native";

/* Se importan los componentes provenientes de native-base 
    para poder mostrar los datos provenientes de la API */
import {
    Card,
    CardItem,
    Spinner,
    H1,
    Body,
    Item,
    Container,
    Content,
    H2
} 
from "native-base";


/* Se traen de los archivos backend y enviroment
   los compontes nesarios para utlizar la API en la pantalla */
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

/*  Componente importado para poder seleccionar un destino y con ello
    poder acceder a los hoteles correspondientes */
import { TouchableOpacity } from "react-native-gesture-handler";

// Variable importada desde enviromente para utilizarla en la API

const { width, height} = Dimensions.get("window");

const { apiUrl } = getEnvVars();


/* Funcion principal de la segunda pantalla, donde se retornan los destinos
    encontrados segun la ubicacion ingresada en la primera pantalla */

const OasisSearchResults = ({ route, navigation}) => {

    // Variables provenientes de la primera pantalla OaisHomeSearch
    // para poder utilizarlas como parametro de busqueda en la API

    const { search, people, checkIn, checkOut } = route.params;

    // Variables que se utlizaran en funcion con la API para atraer los
    // datos que esta nos retorne.

    const [hotels, setHotels] = useState(null);

    // Varibles para cuando ocurra un error en la funcion
    const [ error, setError] = useState(false);

    /* Funcion encargada de traer los datos provenientede la API
       teniendo como parametros algunas variables declaradas anteriomente
       con el fin de extraer los datos necesarios.  */

    const getHotels = async () =>{

        try {

            const response = await backend.get(`locations/search?query=${search}&locale=en_US`);
            // console.log(response.data);
            setHotels(response.data);
        

        }
        catch(error){
            setError(true);
        }

    }

    // HOOKS de efecto que retorna la funcion getHotels
    useEffect(() =>
    {
        getHotels();
    }, []);

    // Condicion encargada de mostrar un Spinner en la pantalla cuando
    // no se encuentren datos correspondientes a la ubicacion ingresada.
    if (!hotels){
        return(
            <View style = {{flex :1, justifyContent:"center"}}>
                <Spinner color ="#aac7e2"/>
            </View>
        )  
    }

    // console.log(hotels.suggestions[0].entities)

    /* Punto de retorno de la funcion principal, donde en la cual esta 
        incorpoda el diseño de dicha pantalla */
    return(
        <Container style ={{ backgroundColor: "#1d5d77"}}>
            <H1 style={styles.titulosIniciales}> {search}</H1>
            <View style ={{marginRight:10, marginLeft:10}}>
                <Text style={styles.titulos}>Select the destination you want according to the location</Text>
            </View>
        <Content styles = {{marginTop:30}} style={styles.sizeContenedor}>
            <Text style ={styles.opciones} >Places of the City</Text>
            <View>
                <FlatList style ={styles.sizeFla}
                data = {hotels.suggestions[0].entities}
                keyExtractor ={(item) => item.destinationId}
                ListEmptyComponent = {<Text>No hotels found</Text>}
                renderItem ={({item}) =>{
                    return(
                    <View >
                         <TouchableOpacity onPress = {() => { navigation.navigate("InfoHotels", {destinationId: item.destinationId, people})}}>
                            <Card style= {styles.opcionesDestino}>
                                <CardItem>
                                    <Body>
                                        <Text>{item.name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                    ) 
                }}
                />
        </View>
        <Text style ={styles.opciones}>Reference point</Text>
        <View>
        <FlatList style ={{backgroundColor: "#1d5d77"}}
             data = {hotels.suggestions[1].entities}
             keyExtractor ={(item) => item.destinationId}
             ListEmptyComponent = {<Text>No hotels found</Text>}
             renderItem ={({item}) =>{
                 return(
                    <View >
                         <TouchableOpacity onPress = {() => { navigation.navigate("InfoHotels", {destinationId: item.destinationId, people})}}>
                            <Card  style= {styles.opcionesDestino}>
                                <CardItem>
                                    <Body>
                                        <Text>{item.name}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                 ) 
             }}
        />
        </View>
        <Text style ={styles.opciones}>Transport groups</Text>
        <View>
        <FlatList style ={{backgroundColor: "#1d5d77"}}
                    data = {hotels.suggestions[2].entities}
                    keyExtractor ={(item) => item.destinationId}
                    ListEmptyComponent = {<Text>No hotels found</Text>}
                    renderItem ={({item}) =>{
                        return(
                        <View >
                            <TouchableOpacity onPress = {() => { navigation.navigate("InfoHotels", {destinationId: item.destinationId, people})}}>
                                 <Card  style= {styles.opcionesDestino}>
                                     <CardItem>
                                         <Body>
                                             <Text style = {{justifyContent:"center"}}>{item.name}</Text>
                                         </Body>
                                    </CardItem>
                                    </Card>
                            </TouchableOpacity>
                        </View>
                        ) 
                    }}
                />
         </View>
        </Content>
    </Container>
 
    );
}


// Estilos de diseño para los diferentes componentes desde el tamaño, 
// color y personalizacion de elementos necesarios para la pantalla


const styles = StyleSheet.create({

    sizeContenedor:{
        height: height * 90,
        width: width * 1.10,
        backgroundColor: "#1d5d77"
    },
    
    titulos:{
        fontSize:17,
        justifyContent: "center",
        marginTop: 15
    },

    opciones:{
        fontSize:17,
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 120,
        fontWeight: 'bold'

    },

    opcion4:{
        fontSize:17,
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 100,
        fontWeight: 'bold'

    },

    titulosIniciales:{
        fontSize:25,
        alignContent: "center",
        marginTop: 10,
        fontWeight: 'bold'
        // marginLeft: 50,
        // marginRight:50
    },

    opcionesDestino:{

        height: 30, 
        width:307, 
        marginLeft: 50, 
        marginBottom: 20

    }

});

// Exporta la funcion para que pueda ser utilizada en en manejo
// de pantallas en App.js

export default OasisSearchResults; 