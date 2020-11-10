/* Importar modulos necesarios para la pantalla */
/*Diseño*/
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Dimensions, View} from "react-native";

import {
    Container,
    Header,
    H1,
    Body,
    Left,
    Right, 
    Text,
    DatePicker,
    Input,
    Content,
    Button,
    Icon, 
    Item
} from "native-base";

import backend from "../api/backend";
<<<<<<< HEAD
import getEnvVars from "../../enviroment";

const {apiKey} = getEnvVars();

//const { width, height} = Dimensions.get("window");

const OasisHomeSearch = () => {

    const [hotels, setHolets] = useState(null);

    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");

        const getHotels = async () =>
        {
            try{

            const response = await backend.get(`flights?access_key=${apiKey}`);

            console.log(response.data);
            //setHolets(response.data);
            }
            catch(error){
                setError(true);
            }
        }

        useEffect(() =>{
            getHotels();
        });
        
=======
import getEnvVars  from "../../enviroment";

const  { apiUrl } = getEnvVars();


//const { width, height} = Dimensions.get("window");

const OasisHomeSearch = ( {navigation } ) => {


    //Variables necesarias para la conectividad de la

    const [ search, setSearch ] = useState("");


>>>>>>> 0267cdaccf5ff1e25e38bc424d60eea68ae70cec
    return (
        <Container style= {styles.container}>
            {/* <Header style = {styles.header}>
                <Image source={require("../../assets/logo.png")} style = {styles.oasisImage}/>
                <Text style= {{marginTop: 20}} style={styles.eslogan}>Encuentra tu serenidad</Text>
            </Header> */}
            <Content style={{marginTop:90, marginLeft: 30, marginRight: 30}}>
            <Item>
            <Input placeholder="Ubicación" style={styles.texto} value={search} onChangeText={setSearch} />
            <Icon name="ios-search"/>
          </Item>
                <View style={{flex:1, flexDirection: 'row', marginTop: 20}} >
                    <View  style={{height:10, flexDirection: 'row'}}/>
                        <View  style={{flex:17, flexDirection: 'row'}} >
                            <Text style= {{marginLeft: 10}}>Fecha de Entrada</Text>
                        </View>
                        <View  style={{flex:12, flexDirection: 'row'}}>
                        <Text style= {{marginLeft: 15}}>Fecha de Salida</Text>
                        </View>
                </View>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{height:15, flexDirection: 'row'}} />
                    <View  style={{flex:10, flexDirection: 'row', height:40, width:80}} style={{marginTop:10, marginLeft: 16, marginRight: 30, backgroundColor: "#aac7e2"}}>

                    <DatePicker/>
                        </View>
                        <View  style={{flex:10, flexDirection: 'row'}}style={{marginTop:10, marginLeft: 80, marginRight: 25,backgroundColor: "#aac7e2"}}>
                    <DatePicker/>
                        </View>
                </View>
                
                <View>
                <Text style={{marginTop:20, marginLeft: 10, marginRight: 25, marginBottom: 10}}>Habitación para: </Text>
                    <Input style={{marginTop:0, marginLeft: 30, marginRight: 25}} style={styles.texto} placeholder="Cantidad de Personas"/>
                </View>
                    <Button rounded style={styles.boton} 
                    onPress = {() => { navigation.navigate("SearchResults", {search})}}>
                    <Text>Buscar</Text>
                    </Button>

               
            </Content>
            <Image source={require("../../assets/Palmeritas.png")} style={{marginBottom: 30, marginLeft: 150}}/>
        </Container>
    );
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#aac7e2"
    },
    oasisImage :{
        width: 60,
        height: 60,
        marginRight: 120
        //resizeMode: "header",
    },
    header :{ 
        backgroundColor: "#eb9284"
    },
    eslogan: {
        color: "#07263c",
        justifyContent: "center",
        marginRight: 5,
        marginTop: 20,
        marginLeft: -110,
        fontSize: 28,
        fontStyle: "italic"
    },
    texto:{
        justifyContent: "center",
        alignContent:"center",
        backgroundColor: "#FFFFFF",
        marginRight: -25,
        fontStyle: "italic"
    },
    icono:{
        marginTop: 10

    },
    boton:{
        color: "#07263c",
        justifyContent: "center",
        alignContent:"center", 
        height : 50,
        width: 345,
        marginTop: 25
    },
    view:{
        backgroundColor: "#eb9284"
    },
    palmerasImage:{
        width: 100,
        height: 20,
        //resizeMode: "container"
        marginBottom: 100
    }
});

export default OasisHomeSearch;