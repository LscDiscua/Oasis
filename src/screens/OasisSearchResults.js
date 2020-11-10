import React, {useEffect, useState} from "react"

import { StyleSheet, View, Text, FlatList } from "react-native";

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

import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";

const { apiUrl } = getEnvVars();

const OasisSearchResults = ({ route, navigation}) => {

    const { search } = route.params;

    const [hotels, setHotels] = useState(null);

    const [ error, setError] = useState(false);

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

    useEffect(() =>
    {
        getHotels();
    }, []);


    if (!hotels){
        return(
            <View style = {{flex :1, justifyContent:"center"}}>
                <Spinner color ="#aac7e2"/>
            </View>
        )  
    }

    // console.log(hotels.suggestions[0].entities)
    return(
       <Container style ={{backgroundColor: "#aac7e2"}}>
           <H1 style={styles.titulosIniciales}> {search}</H1>
           <View style ={{marginRight:10, marginLeft:10}}>
               <TouchableOpacity onPress = {() => { navigation.navigate("SearchResults")}}>

                    <Text style={styles.titulos}>Seleccione el destino que desea segun la ubicacion</Text>
                </TouchableOpacity>
            </View>
        <Content style={styles.sizeContenedor}>
               
        <View styles = {{marginTop:30}}>
            <Text style ={styles.opciones} >Lugares de la Cuidad</Text>
                <FlatList style ={styles.sizeFla}
                data = {hotels.suggestions[0].entities}
                keyExtractor ={(item) => item.destinationId}
                ListEmptyComponent = {<Text>No se han encontrado Hoteles</Text>}
                renderItem ={({item}) =>{
                    return(
                    <View >
                        <Card style= {styles.opcionesDestino}><CardItem ><Body><Text>{item.name}</Text></Body></CardItem></Card>
                    </View>
                    ) 
                }}
                />
        <Text style ={styles.opciones} >Punto de Referencia</Text>
        <FlatList style ={{backgroundColor: "#aac7e2"}}
             data = {hotels.suggestions[1].entities}
             keyExtractor ={(item) => item.destinationId}
             ListEmptyComponent = {<Text>No se han encontrado Hoteles</Text>}
             renderItem ={({item}) =>{
                 return(
                    <View >
                        <Card  style= {styles.opcionesDestino}><CardItem><Body><Text>{item.name}</Text></Body></CardItem></Card>
                    </View>
                 ) 
             }}
        />
        <Text style ={styles.opciones}>Grupos de Transporte</Text>
        <FlatList style ={{backgroundColor: "#aac7e2"}}
                    data = {hotels.suggestions[2].entities}
                    keyExtractor ={(item) => item.destinationId}
                    ListEmptyComponent = {<Text>No se han encontrado Hoteles</Text>}
                    renderItem ={({item}) =>{
                        return(
                        <View >
                            <Card  style= {styles.opcionesDestino}><CardItem><Body><Text style = {{justifyContent:"center"}}>{item.name}</Text></Body></CardItem></Card>
                        </View>
                        ) 
                    }}
                />
         <Text style={styles.opcion4}> Cercanos a Otros Hoteles</Text>
         <FlatList style ={{backgroundColor: "#aac7e2"}}
                    data = {hotels.suggestions[3].entities}
                    keyExtractor ={(item) => item.destinationId}
                    ListEmptyComponent = {<Text>No se han encontrado Hoteles</Text>}
                    renderItem ={({item}) =>{
                        return(
                        <View >
                            <Card  style= {styles.opcionesDestino}><CardItem><Body><Text>{item.name}</Text></Body></CardItem></Card>
                        </View>
                        ) 
                    }}
                />
        </View>
        </Content>
       </Container>
 
    );
}

const styles = StyleSheet.create({

    sizeContenedor:{
        height: 500,
        width: 500
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

export default OasisSearchResults; 