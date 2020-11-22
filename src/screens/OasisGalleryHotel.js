/* Quinta Pantalla de la Aplicacion Osasis Gallery Hotel
   donde se mostrara las galeria de fotos del hotel seleccionado 
   anteriormente en la cuarta pantalla */

/* Se importan los modulos necesarios para la pantalla  desde react */
import React,{useEffect, useState} from "react";

import { StyleSheet, View, Text, Dimensions,Image, FlatList} from "react-native";

/* Se importan los componentes provenientes de native-base 
    para poder mostrar los datos provenientes de la API */

import {
    CardItem,
    Container,
    Card,
    Body,
    Spinner
} 
from "native-base";

/* Se traen de los archivos backend y enviroment
   los componentes nesarios para utlizar la API en la pantalla */ 
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

// Variable para utilizar las dimensiones de la pantalla.
const { width, height} = Dimensions.get("window");

// Variable importada desde enviromente para utilizarla en la API
const { apiurl } = getEnvVars();

/* Funcion principal de la Quinta pantalla, donde se retornan la galeria
    del hotel seleccionado en la cuarta pantalla */

const OasisGalleryHotel = ({ route, navigate}) =>{

    // Variables provenientes de la primera y segunda pantalla (OaisHomeSearch y OasisSearchResults)
    // para poder utilizarlas como parametro de busqueda en la API

    const { id, name} = route.params;

    // Variables que se utlizaran en funcion con la API para atraer los
    // datos que esta nos retorne.

    const [ galleryHotel, setGalleryHotel ] = useState("");

    // Varibles para cuando ocurra un error en la funcion

    const [ error, setError ] = useState(false);

    /* Funcion encargada de traer los datos provenientede la API
       teniendo como parametros algunas variables declaradas anteriomente
       con el fin de extraer los datos necesarios.  */

    const getGalleryHotel = async () =>{

        try{

            const response = await backend.get(`properties/get-hotel-photos?id=${id}`);
            // console.log(response.data);
            setGalleryHotel(response.data);

        }
        catch(error){
            setError(true);
        }
    }

    // HOOKS de efecto que retorna la funcion getResultsHotels
    useEffect(() =>{
        getGalleryHotel();
    },[]);

    // Condicion encargada de mostrar un Spinner en la pantalla cuando
    // no se encuentren datos correspondientes en el hotel seleccionado.

    if(!galleryHotel){
        return(
            <View style ={{flex: 1, justifyContent: "center"}}> 
                <Spinner color = "#aac7e2"/>
            </View>
        )
    }
    
    /* Punto de retorno de la funcion principal, donde en la cual esta 
       incorpoda el diseño de dicha pantalla y los resultados encontrados 
       en la API */
    return (
        <View style ={{ backgroundColor: "#1d5d77"}}>
            <View>
                 <Text style ={styles.nombreHotel}>{name}</Text>
            </View>
            {/* Vista encargada de mostrar los datos de la API a traves del flastList */}
            <View style ={{marginBottom: 120}}>
                <FlatList
                data = {galleryHotel.hotelImages}
                keyExtractor = {(item) => item.imageId.toString()}
                renderItem ={({item}) =>{
                    return (
                        <View> 
                            <Card style ={styles.cardImage}>
                                <CardItem style ={{backgroundColor: "#aac7e2"}}>
                                    <Body>
                                        <Image source={{uri: `${item.baseUrl.slice(0,-11)+".jpg"}`}} 
                                        style ={styles.hotelImage}/>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    )
                }}  
                />
            </View>
        </View>
    )
}

// Estilos de diseño para los diferentes componentes desde el tamaño, 
// color y personalizacion de elementos necesarios para la pantalla.

const styles = StyleSheet.create({

    // Estilo  de las imagenes 
    hotelImage:{
        height: height * 0.30,
        width: width * 0.75,
        marginLeft: 20,
        marginRight: 35,
        alignItems: "center",
        marginTop: 20
    },
    // Estilo del letra del texto que muestra el nombre del hotel
    nombreHotel:{
        fontSize: 25,
        marginTop: 15,
        // marginLeft : 40,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems:"center",
        textAlign: "center",
        color:  "#000000",
        fontWeight: "bold"
    },

    // Estilo del card del FlasList
    cardImage:{
        // height: 260, 
        // width:380, 
        height: height * 0.40,
        width: width * 0.93,
        marginLeft: 15, 
        marginRight: 15,
        backgroundColor: "#aac7e2"
    },

});

// Exporta la funcion para que pueda ser utilizada en en manejo
// de pantallas en App.js

export default OasisGalleryHotel;



