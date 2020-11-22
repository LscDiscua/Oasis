import React,{useEffect, useState} from "react";

import { StyleSheet, View, Text, Dimensions,Image, FlatList} from "react-native";

import {
    CardItem,
    Container,
    Card,
    Body
} 
from "native-base";


import backend from "../api/backend";
import getEnvVars from "../../enviroment";

// const { width, heigth} = Dimensions.get("windows");
const { apiurl } = getEnvVars();

const OasisGalleryHotel = ({ route, navigate}) =>{

    const { id, name} = route.params;

    const [ galleryHotel, setGalleryHotel ] = useState("");

    const [ error, setError ] = useState(false);

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
    useEffect(() =>{
        getGalleryHotel();
    },[]);

    
    return (

        <View>
            <View>
            <Text>{name}</Text>
            </View>

            <View>
                <FlatList
                data = {galleryHotel.hotelImages}
                keyExtractor = {(item) => item.imageId.toString()}
                renderItem ={({item}) =>{
                    return (
                        <View> 
                            <Card>
                                <CardItem>
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

const styles = StyleSheet.create({

    hotelImage:{
        height: 200,
        width: 300,
        marginLeft: 19
    },

});

export default OasisGalleryHotel;



