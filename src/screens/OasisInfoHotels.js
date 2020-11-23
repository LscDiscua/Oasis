/* Tercera Pantalla de la Aplicacion Osasis Info Hotels
   donde se mostrara una lista de hoteles encontrados provenientes
   del destino indicado en la segunda pantalla */

/* Se importan los modulos necesarios para la pantalla  desde react */
import React, {useEffect, useState} from "react"

import {StyleSheet, View, Text, FlatList, Image, Dimensions} from "react-native";

/* Se importan los componentes provenientes de native-base 
    para poder mostrar los datos provenientes de la API */

import {
    CardItem,
    Container, 
    Spinner,
    H1,
    Content,
    Card,
    Body
}
from "native-base";

/* Se traen de los archivos backend y enviroment
   los componentes nesarios para utlizar la API en la pantalla */

import backend from "../api/backend";
import getEnvVars from "../../enviroment";

/*  Componente importado para poder seleccionar un hotel y con ello
    poder acceder a los detalles del hotel */
import { TouchableOpacity } from "react-native-gesture-handler";

// Variable importada desde enviromente para utilizarla en la API

const {apiUrl} = getEnvVars();

// Variable para utilizar las dimensiones de la pantalla.

const { width, height} = Dimensions.get("window");

/* Funcion principal de la tercera pantalla, donde se retornan los hoteles
    encontrados segun el destino seleccioando en la segunda pantalla */

const OasisInfoHotels = ({ route, navigation}) => {

    // Variables provenientes de la primera y segunda pantalla (OaisHomeSearch y OasisSearchResults)
    // para poder utilizarlas como parametro de busqueda en la API

    const   { destinationId, people, checkIn, checkOut} = route.params;

    // Variables que se utlizaran en funcion con la API para atraer los
    // datos que esta nos retorne.

    const [ resultHotels, setResultsHotels ] = useState(null);

    // Varibles para cuando ocurra un error en la funcion

    const [ error, setError ] = useState(false);

    /* Funcion encargada de traer los datos provenientede la API
       teniendo como parametros algunas variables declaradas anteriomente
       con el fin de extraer los datos necesarios.  */

    const getResultsHotels = async () =>{

        try{

            const response = await backend.get(`properties/list?destinationId=${destinationId}&pageNumber=1&checkIn=${checkIn}&checkOut=${checkOut}&pageSize=25&adults${people}=1&currency=USD&locale=en_US&sortOrder=PRICE`);

            // console.log(response.data);
            setResultsHotels(response.data);
        }
        catch(error){
            setError(true);
        }
    }


    // HOOKS de efecto que retorna la funcion getResultsHotels
    useEffect(() =>{
         getResultsHotels();
    }, []);

    // Condicion encargada de mostrar un Spinner en la pantalla cuando
    // no se encuentren datos correspondientes en el destino seleccionado.

    if(!resultHotels){
        return(
            <View style = {{flex :1, justifyContent:"center"}} >
                <Spinner color ="#aac7e2"/>
            </View>
        )
    }

    /* Punto de retorno de la funcion principal, donde en la cual esta 
        incorpoda el diseño de dicha pantalla y los resultados encontrados 
        en la API */

    return(
        <View>
            {/* Vista que muestra un encabezado en la pantalla */}
            <View  style ={{ backgroundColor: "#1d5d77"}}>
                <Text style={styles.informacionHotel}>
                    Choose the Hotel you want
                </Text>
            </View>
            {/* Vista encargada de mostrar los datos obtenidos en la API
                a traves de un FlatList y sus componentes*/}
                <View style ={{marginBottom: 75}}>
                    <FlatList style ={{ backgroundColor: "#1d5d77"}}
                    data ={resultHotels.data.body.searchResults.results}
                    keyExtractor = {(item) => item.id.toString()}
                    ListEmptyComponent ={<Text>No hotels found</Text>}
                    renderItem = {({item}) =>{
                        return(
                            <View>
                                <TouchableOpacity onPress = {() => { navigation.navigate("HotelDetails", {id: item.id, 
                                    name: item.name, thumbnailUrl: item.thumbnailUrl, people, checkIn, checkOut})}}>
                                    <Card style={styles.opcionesHoteles}>
                                        <CardItem style ={{backgroundColor: "#aac7e2"}}>
                                            <Body> 
                                                <Image source={{uri:`${item.thumbnailUrl}`, }} 
                                                        style={styles.hotelImage} />  
                                                <Text style={styles.informacionHotel}>{item.name}</Text>
                                                <Text style={styles.calificacionHotel}>score: {item.starRating}{"/5"}</Text>
                                                     
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                            )
                         }}
                        />
                </View>
        </View>
    );
}

// Estilos de diseño para los diferentes componentes desde el tamaño, 
// color y personalizacion de elementos necesarios para la pantalla

const styles = StyleSheet.create({

    // Tamaño de la imagen del hotel que muestra la API
    hotelImage:{
        height: 200,
        width: 300,
        marginLeft: 19
    },

    // Estilo de Card del flatlist 
    opcionesHoteles:{ 
        height: height * 0.40,
        width: width * 0.93,
        marginLeft: 15, 
        marginBottom: 30,
        marginRight: 15,
        backgroundColor: "#aac7e2"
    },

    // Estilo de los text de informacion de la API
    informacionHotel:{
        fontSize: 20,
        color:"#000000",
        marginLeft: 19,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 5

    },

    // Estilo de un text de calificacion del hotel proveniente de la API
    calificacionHotel:{
        fontSize: 18,
        color:"#375A6A",
        marginLeft: 19,
        fontWeight: 'bold',
        marginBottom: 50

    },

    //  Estilo de letra de los encabezado inicial

    textoInicial:{
        fontWeight: "bold",
    }

});

// Exporta la funcion para que pueda ser utilizada en en manejo
// de pantallas en App.js

export default OasisInfoHotels;