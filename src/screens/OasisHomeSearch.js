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

//const { width, height} = Dimensions.get("window");

const OasisHomeSearch = () => {
    return (
        <Container style= {styles.container}>
            <Header style = {styles.header}>
                <Image source={require("../../assets/logo.png")} style = {styles.oasisImage}/>
                <Text style= {{marginTop: 20}} style={styles.eslogan}>Encuentra tu serenidad</Text>
            </Header>
            <Content style={{marginTop:90, marginLeft: 30, marginRight: 30}}>
            <Item>
            <Input placeholder="Ubicación" style={styles.texto}/>
            <Icon name="ios-search"/>
          </Item>
                <View style={{flex:1, flexDirection: 'row', marginTop: 20}} >
                    <View  style={{height:10, flexDirection: 'row'}}/>
                    <View  style={{flex:17, flexDirection: 'row'}} >
                    <Text>Fecha de Entrada</Text>

                        </View>
                        <View  style={{flex:12, flexDirection: 'row'}}>
                        <Text>Fecha de Salida</Text>
                        </View>
                </View>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{height:15, flexDirection: 'row'}} />
                    <View  style={{flex:10, flexDirection: 'row', height:40, width:80}} style={{marginTop:10, marginLeft: 13, marginRight: 30, backgroundColor: "#aac7e2"}}>

                    <DatePicker/>
                        </View>
                        <View  style={{flex:10, flexDirection: 'row'}}style={{marginTop:10, marginLeft: 40, marginRight: 25,backgroundColor: "#aac7e2"}}>
                    <DatePicker/>
                        </View>
                </View>
                
                <View>
                <Text style={{marginTop:20, marginLeft: 0, marginRight: 25}}>Habitación para: </Text>
                    <Input style={{marginTop:0, marginLeft: 30, marginRight: 25}} style={styles.texto} placeholder="Adultos"/>
                    </View>
                    <Button rounded style={styles.boton}>
                    <Text>Buscar</Text>
                    </Button>

               
            </Content>
            <Image source={require("../../assets/Palmeritas.png")} style={{marginBottom: 30, marginLeft: 120}}/>
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
        width: 315,
        marginTop: 25
    },
    view:{
        backgroundColor: "#eb9284"
    },
    palmerasImage:{
        width: 100,
        height: 20,
        //resizeMode: "container"
        marginBottom: 100,
    }
});

export default OasisHomeSearch;