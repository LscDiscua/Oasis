import React, {useEffect, useState} from "react"

import { StyleSheet, View, Text, Dimensions, Image} from "react-native";

import {
    Container, 
    Spinner,
    Content,
    Card,
    Button,
    Icon
}
from "native-base";


import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { useLinkProps } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const { width, height} = Dimensions.get("window");
const { apiUrl } = getEnvVars();



const OasisHotelDetails = ({ route, navigation }) =>{

    const { id, name,thumbnailUrl } = route.params;

    const [ hotelDetails, setHotelDetails ] = useState( null);

    const [ error, setError ] = useState(false);

    const getHotelsDetails = async () => {

        try{
             const response = await backend.get(`properties/get-details?id=${id}&locale=en_US&currency=USD&checkOut=2020-01-15&adults1=1&checkIn=2020-01-08`);

             setHotelDetails(response.data);
        }
        catch(error){
            setError(true);
        }
    }


    useEffect(() =>
    {
        getHotelsDetails();
        // getPhotosHotel();
    }, []);


    if(!hotelDetails){
        return(
            <View style ={{flex: 1, justifyContent: "center"}}> 
                <Spinner color = "#aac7e2"/>
            </View>
        )
    }
    // C:\Users\linda\OneDrive\Documentos\III Periodo 2020\Programacion Movil I\Proyecto\Oasis

    return(
        <Container style={styles.contenedor}>
            <Content style={styles.contenedor}>
                <View>
                    <Card style = {styles.cardEstilo}>
                    <View>
                    <Text style= {styles.nombreHotel}>{name}</Text>
                    <Image source={{uri:`${thumbnailUrl}`, }} 
                            style={styles.hotelImage} /> 
                        <Button transparent
                                 onPress = {() => { navigation.navigate("GalleryHotel", {id, name})}} >
                                     <Text style={styles.textoBoton}>GalleryHotel</Text>
                                <Icon name = "images"/>
                        </Button>
                        
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
                    </Card>
                </View>
            </Content>
        </Container>
    );

}

const styles = StyleSheet.create({

    contenedor:{
        backgroundColor: "#1d5d77",
        fontSize:50,
        height : height * 2,
        marginTop: -3
    },

    cardEstilo:{
        backgroundColor: "#1d5d77",
        fontSize:50,
        height : height * 2
    },

    nombreHotel:{
        fontSize: 25,
        marginLeft : 30,
        marginBottom: 15,
        justifyContent: "center",
        color:  "#000000",
        fontWeight: "bold"
    },

    botonGaleria:{
        height:50, 
        width:80, 
        // backgroundColor: "#aac7e2",
        marginLeft:30
    },
    textoBoton:{
        fontSize: 20
    },

    contenido:{
        fontSize:30
    },
    comodidades:{

        fontSize:20
    },
    hotelImage:{
        height: 200,
        width: 300,
        marginLeft: 50
    }
});




export default OasisHotelDetails;