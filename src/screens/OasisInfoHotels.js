import React, {useEffect, useState} from "react"

import {StyleSheet, View, Text, FlatList, Image} from "react-native";

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

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";

const {apiUrl} = getEnvVars();

const OasisInfoHotels = ({ route, navigation}) => {


    const   { destinationId, people} = route.params;

    const [ resultHotels, setResultsHotels ] = useState(null);

    const [ error, setError ] = useState(false);

    const getResultsHotels = async () =>{

        try{

            const response = await backend.get(`properties/list?destinationId=${destinationId}&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE`);

            // console.log(response.data);
            setResultsHotels(response.data);
        }
        catch(error){
            setError(true);
        }
    }

    useEffect(() =>{
         getResultsHotels();
    }, []);

    if(!resultHotels){
        return(
            <View style = {{flex :1, justifyContent:"center"}} >
                <Spinner color ="#aac7e2"/>
            </View>
        )
    }

    // console.log(resultHotels.data.body.searchResults.results[0].id)
    return(
            <View>
                <View  style ={{ backgroundColor: "#1d5d77"}}>
                    <Text style={styles.informacionHotel}>
                        Escoja el Hotel que desea {people}
                    </Text>
                </View>
                    <View>
                        <FlatList style ={{ backgroundColor: "#1d5d77"}}
                         data ={resultHotels.data.body.searchResults.results}
                         keyExtractor = {(item) => item.id.toString()}
                         ListEmptyComponent ={<Text>No hotels found</Text>}
                         renderItem = {({item}) =>{
                                return(
                                    <View>
                                        <TouchableOpacity onPress = {() => { navigation.navigate("HotelDetails", {id: item.id, 
                                            name: item.name, thumbnailUrl: item.thumbnailUrl})}}>
                                        <Card style={styles.opcionesHoteles}>
                                            <CardItem style ={{backgroundColor: "#aac7e2"}}>
                                                <Body> 
                                                    <Image source={{uri:`${item.thumbnailUrl}`, }} 
                                                        style={styles.hotelImage} />  
                                                    <Text style={styles.informacionHotel}>{item.name}</Text>
                                                     <Text style={styles.calificacionHotel}>Calificacion: {item.starRating}</Text>
                                                     
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

const styles = StyleSheet.create({

    hotelImage:{
        height: 200,
        width: 300,
        marginLeft: 19
    },

    opcionesHoteles:{
        height: 260, 
        width:380, 
        marginLeft: 15, 
        marginBottom: 30,
        backgroundColor: "#aac7e2"
    },
    informacionHotel:{
        fontSize: 20,
        color:"#000000",
        marginLeft: 19,
        fontWeight: 'bold'

    },

    calificacionHotel:{
        fontSize: 18,
        color:"#375A6A",
        marginLeft: 19,
        fontWeight: 'bold',
        marginBottom: 50

    },

    textoInicial:{
        fontWeight: "bold",
        
    }

});

export default OasisInfoHotels;