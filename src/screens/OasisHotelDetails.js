import React, {useEffect, useState} from "react"

import { StyleSheet, View, Text, Dimensions} from "react-native";

import {
    Container, 
    Spinner,
    Content,
    Card
}
from "native-base";


import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { width, height} = Dimensions.get("window");
const { apiUrl } = getEnvVars();



const OasisHotelDetails = ({ route, navigation }) =>{

    const { id } = route.params;

    const [ hotelDetails, setHotelDetails ] = useState( null);
    
    const [ photosHotel, setPhotosHotel ] = useState (null);

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

    // const getPhotosHotel = async () => {

    //     try{
    //         const respuesta = await backend.get(`properties/get-hotel-photos?id=${id}`);
    //         console.log (response.data)
    //         setPhotosHotel(respuesta.data);
    //     }
    //     catch(error){
    //         setError(true);
    //     }
    // }

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

    // function cantidadComodidades (comodidades) {

    //    const comodidades = [hotelDetails.data.body.overview.overviewSections[0].content];
    //    for(let i=0; i < comodidades.length; i++){
    //          comodidades[i] + "<br>";
    //    }

    //    return comodidades;

    // }

    // console.log(hotelDetails.data.body.overview.overviewSections[0].content)

    // console.log(hotelDetails.data.body.pdpHeader.hotelId);

    return(
        <Container>
            <View>
            </View>
            <Content>
                <View>
                    <Card style = {styles.contenedor}>
                        <Text style= {styles.contenido}>{hotelDetails.data.body.overview.overviewSections[0].title}</Text>
                        <Text style= {styles.comodidades}>{hotelDetails.data.body.overview.overviewSections[0].content}</Text>
                         <Text style= {styles.contenido}>{hotelDetails.data.body.overview.overviewSections[1].title}</Text>
                         <Text style= {styles.comodidades}>{hotelDetails.data.body.overview.overviewSections[1].content}{'\n'}</Text>
                         <Text style= {styles.comodidades}>{hotelDetails.data.body.hygieneAndCleanliness.title}</Text>
                        <Text style= {styles.comodidades}>{hotelDetails.data.body.hygieneAndCleanliness.healthAndSafetyMeasures.description}{'\n'}</Text>
                         <Text style= {styles.comodidades}>{hotelDetails.data.body.hygieneAndCleanliness.healthAndSafetyMeasures.measures}</Text>
                    </Card>
                </View>
            </Content>
        </Container>
    );

}

const styles = StyleSheet.create({

    contenedor:{
        backgroundColor: "#aac7e2",
        fontSize:50,
        height : height * 2
    },

    contenido:{
        fontSize:30
    },
    comodidades:{

        fontSize:20
    }
});




export default OasisHotelDetails;