/* Cuarta Pantalla de la Aplicacion Osasis Hotel Details
   donde se mostrara una detalles del hotel seleccionado 
   anteriormente en la tercera pantalla */

/* Se importan los modulos necesarios para la pantalla  desde react */
import React, {useEffect, useState} from "react"

import { StyleSheet, View, Text, Dimensions, Image} from "react-native";

/* Se importan los componentes provenientes de native-base 
    para poder mostrar los datos provenientes de la API */

import {
    Container, 
    Spinner,
    Content,
    Card,
    Button,
    Icon
}
from "native-base";

/* Se traen de los archivos backend y enviroment
   los componentes nesarios para utlizar la API en la pantalla */ 

import backend from "../api/backend";
import getEnvVars from "../../enviroment";

// Importacion de algunos componentes necesarios en la pantalla
import { useLinkProps } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

// Variable para utilizar las dimensiones de la pantalla.
const { width, height} = Dimensions.get("window");

// Variable importada desde enviromente para utilizarla en la API
const { apiUrl } = getEnvVars();

/* Funcion principal de la Cuarta pantalla, donde se retornan los detalles 
    del hotel seleccionado en la tercera pantalla */

const OasisHotelDetails = ({ route, navigation }) =>{

    // Variables provenientes de la primera y segunda pantalla (OaisHomeSearch y OasisSearchResults)
    // para poder utilizarlas como parametro de busqueda en la API

    const { id, name,thumbnailUrl, people, checkIn, checkOut} = route.params;

    // Variables que se utlizaran en funcion con la API para atraer los
    // datos que esta nos retorne.

    const [ hotelDetails, setHotelDetails ] = useState( null);

    // Varibles para cuando ocurra un error en la funcion

    const [ error, setError ] = useState(false);

    /* Funcion encargada de traer los datos provenientede la API
       teniendo como parametros algunas variables declaradas anteriomente
       con el fin de extraer los datos necesarios.  */

    const getHotelsDetails = async () => {

        try{
             const response = await backend.get(`properties/get-details?id=${id}&locale=en_US&currency=USD&checkOut=${checkOut}&adults1=${people}&checkIn=${checkIn}`);

             setHotelDetails(response.data);
        }
        catch(error){
            setError(true);
        }
    }

    // HOOKS de efecto que retorna la funcion getResultsHotels
    useEffect(() =>
    {
        getHotelsDetails();
    }, []);

    // Condicion encargada de mostrar un Spinner en la pantalla cuando
    // no se encuentren datos correspondientes en el hotel seleccionado.

    if(!hotelDetails){
        return(
            <View style ={{flex: 1, justifyContent: "center"}}> 
                <Spinner color = "#aac7e2"/>
            </View>
        )
    }
    // C:\Users\linda\OneDrive\Documentos\III Periodo 2020\Programacion Movil I\Proyecto\Oasis


    /* Punto de retorno de la funcion principal, donde en la cual esta 
        incorpoda el diseño de dicha pantalla y los resultados encontrados 
        en la API */

    return(
        <Container style={styles.contenedor}>
            <Content style={styles.contenedor}>
                {/* Vista encargada de mmostrar los datos de la API, en cuestion 
                    de detalles del hotel seleccionado anteriormente en la tercera pantalla */}
                <View>
                    <Card style = {styles.cardEstilo}>
                    <View>
                        <Text style= {styles.nombreHotel}>{name}</Text>
                            <Image source={{uri:`${thumbnailUrl}`, }} 
                                style={styles.hotelImage} /> 
                    </View>
                        <Text style= {styles.contenido}>{hotelDetails.data.body.overview.overviewSections[0].title}</Text>
                        {hotelDetails.data.body.overview.overviewSections[0].content.map((index) =>(
                            <Text style={styles.comodidades}>
                               {"-"}{" "}{index}
                            </Text>
                        ))}
                        <Text style= {styles.contenido}>{hotelDetails.data.body.overview.overviewSections[1].title}</Text>
                        {hotelDetails.data.body.overview.overviewSections[1].content.map((around) => (
                            <Text style={styles.comodidades}>  
                               {"-"} {" "}{around}
                            </Text>
                        ))}
                        
                    <View>
                    <Button rounded style = {styles.botonGaleria}
                                 onPress = {() => { navigation.navigate("GalleryHotel", {id, name})}} >
                                <Text style={styles.textoBoton}>GalleryHotel</Text>
                                <Icon name = "images" style = {styles.icono}/>
                        </Button>
                    </View>
                    </Card>
                </View>
            </Content>
        </Container>
    );

}

// Estilos de diseño para los diferentes componentes desde el tamaño, 
// color y personalizacion de elementos necesarios para la pantalla.

const styles = StyleSheet.create({

    // Estilo de content y container de la pantalla
    contenedor:{
        backgroundColor: "#1d5d77",
        fontSize:50,
        height : height * 2,
        marginTop: -3
    },

    // Estilo del card de informacion
    cardEstilo:{
        backgroundColor: "#1d5d77",
        fontSize:50,
        height : height * 1.7
    },

    // Estilo del text que muestra el nombre del hotel
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

    // Estilo del boton que conduce a la siguiente pantalla

    botonGaleria:{
        marginTop: 30,
        height: height * 0.070, 
        width: width * 0.50, 
        marginRight: 30,
        marginLeft: 99,
        backgroundColor: "#aac7e2",
        justifyContent: "center",
        marginBottom: 5
    },

    // Estilo de texto de la letra del boton 
    textoBoton:{
        fontSize: 20,
        color: "#1d5d77",
        fontWeight: "bold",
        marginLeft: 27
    },

    // Estilo del icono 
    icono:{
        color: "#1d5d77",
        height: height * 0.040 ,
        width: width * 0.080
    },
    // Estilo de titulos de los detalles
    contenido:{
        fontSize:30
    },

    // Estilo de los texto de las comodidades 
    comodidades:{
        marginLeft: 10,
        fontSize:20
    },

    // Estilo de la imagen del hotel
    hotelImage:{
        height: 200,
        width: 300,
        marginLeft: 50
    }
});

// Exporta la funcion para que pueda ser utilizada en en manejo
// de pantallas en App.js

export default OasisHotelDetails;