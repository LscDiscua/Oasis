/* Importar modulos necesarios para la pantalla */
/*Diseño*/
import React, { useEffect, useState} from "react";
import { StyleSheet, Image, Dimensions, View} from "react-native";
import DatePicker from "react-native-datepicker";

// Importacion de compenentes necesarios para la primera pantalla
import {
    Container,
    Header,
    H1,
    Body,
    Left,
    Right, 
    Text,
    Input,
    Content,
    Button,
    Icon, 
    Item
} from "native-base";

import backend from "../api/backend";
import getEnvVars  from "../../enviroment";

const  { apiUrl } = getEnvVars();

// Variables declaradas para poder utilizar dimensiones del ancho 
// y largo de la pantalla.

const { width, height} = Dimensions.get("window");

// Funcion principal donde se realiza todo los procesos de la primera pantalla,
// donde estan incorporadas los componetes que se mostraran en la misma

const OasisHomeSearch = ( {navigation } ) => {

    /*Variables necesarias para la el funcionamiento de la pantalla*/

    // Variables Search que se encargan de almacenar el valor de la ubicacion 
    // ingresada en el primer input de la pantalla

    const [ search, setSearch ] = useState("");

    // Variables checkin que almecenan el valor de la fecha de entrada 
    // ingresada en el primer DatePicker
    
    const [ checkIn, setCheckIn ] = useState("");

    // Variables checkOut que almecenan el valor de la fecha de salida
    // ingresada en el primer DatePicker

    const [ checkOut, setCheckOut ] = useState("");

    // Variables people que almecenan el valor de la cantidad de personas
    // que se registrarian en este caso en el hotel

    const [ people, setPeople] = useState("");


    // Return de la funcion donde esta la interfaz de la pantalla 
    // OasisHomeSearch
            
    return (
        <Container style= {styles.container}>
            {/* <Header style = {styles.header}>
                <Image source={require("../../assets/logo.png")} style = {styles.oasisImage}/>
                <Text style= {{marginTop: 20}} style={styles.eslogan}>Encuentra tu serenidad</Text>
            </Header> */}
            <Content style={{marginTop:75, marginLeft: 30, marginRight: 30}}>
            <Item>
            <Input placeholder="Location" style={styles.cajasDeTexto} value={search} onChangeText={setSearch} />
            <Icon name="ios-search"/>
          </Item>
                <View style={{flex:1, flexDirection: 'row', marginTop: 10}} >
                    <View  style={{height:10, flexDirection: 'row'}}/>
                        <View  style={{flex:17, flexDirection: 'row'}} >
                            <Text style= {{marginLeft: 30}} style= {styles.estiloTexto}>Incoming date</Text>
                        </View>
                        <View  style={{flex:12, flexDirection: 'row'}}>
                        <Text style= {{marginLeft: 7}} style= {styles.estiloTexto}>Outcoming date</Text>
                        </View>
                </View>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{height:height * 0.10, flexDirection: 'row'}} />
                    <View style = {styles.viewEntrada}>
                    <DatePicker 
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    textStyle={{ color: "#FFFFFF" }}
                    mode="date"
                    onDateChange={(checkIn) => {
                        setCheckIn(checkIn);}}
                    />
                    </View>
                    <View style={styles.viewSalida}>
                        <DatePicker 
                            mode="date"
                            onDateChange={(checkOut) => {
                                setCheckOut(checkOut);}}/>
                        </View>
                  </View>
                
                <View style = {styles.numeroPersonas}>
                <Text style={styles.estiloTexto}> Number of people: </Text>
                    <Input style={styles.cajasDeTexto} value ={people} onChangeText = {setPeople}/>
                </View>
                    <Button rounded style={styles.boton} 
                    onPress = {() => { navigation.navigate("SearchResults", {search, people, checkIn,checkOut})}}>
                    <Text style = {styles.textoBoton}>search</Text>
                    </Button>
            </Content>
            <Image source={require("../../assets/Palmeritas.png")} style={styles.palmerasImage}/>
        </Container>
        
    );
}

// Estilos de diseño para los diferentes componentes
//  desde el tamaño, color y personalizacion de elementos

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor: "#1d5d77"
    },
    oasisImage :{
        width: width * 0.10,
        height: height * 0.077,
        marginRight: 120

    },
    header :{ 
        backgroundColor: "#eb9284"
    },

    viewEntrada:{
        flex: 10,
        flexDirection: "row",
        height: height * 0.10,
        width: width * 0.10,
        marginTop: 10,
        marginLeft: 17,
        marginRight: 25,
        backgroundColor : "#1d5d77",
        color: "#FFFFFF"
        // style={{flex:10, flexDirection: 'row'}} style={{marginTop:10, marginLeft: 16, marginRight: 30, backgroundColor: "#aac7e2"}}

    },

    viewSalida:{
        flex: 10,
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 60,
        marginRight: 25,
        backgroundColor :"#1d5d77"
        // style={{flex:10, flexDirection: 'row'}}style={{marginTop:10, marginLeft: 80, marginRight: 25,backgroundColor: "#aac7e2"}}
    },

    numeroPersonas:{

        marginTop: -10,
        marginLeft: 10,
        marginRight: 25,
        marginBottom: 10
        // style={{marginTop:5, marginLeft: 10, marginRight: 25, marginBottom: 10}}
    },

    eslogan: {
        color: "#07263c",
        justifyContent: "center",
        marginRight: 5,
        marginTop: 20,
        marginLeft: -110,
        fontSize: 28
    },
    cajasDeTexto:{
        justifyContent: "center",
        alignContent:"center",
        backgroundColor: "#FFFFFF",
        marginRight: -25,
        marginTop: 10
    },

    estiloTexto:{
        justifyContent: "center",
        alignContent:"center",
        color: "#FFFFFF",
        fontSize: 19,
        marginRight: 10,
        marginTop: 8
    },
    icono:{
        marginTop: 10

    },
    boton:{
        backgroundColor: "#aac7e2",
        justifyContent: "center",
        alignContent:"center", 
        height: height * 0.08,
        width: width * 0.85,
        marginTop: 15
    },

    textoBoton:{
        justifyContent: "center",
        color: "#1d5d77",
        fontSize: 15,
       fontWeight: "bold"

    },
    view:{
        backgroundColor: "#1d5d77"
    },
    palmerasImage:{
        width : width * 0.30,
        height: height * 0.20,
        marginBottom: 25,
        marginLeft: 150
    }
});


// Exporta la funcion para que pueda ser utilizada en en manejo
// de pantallas en App.js
export default OasisHomeSearch;