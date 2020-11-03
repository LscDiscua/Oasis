/* Importar modulos necesarios para la pantalla */
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
    Icon
} from "native-base";

//const { width, height} = Dimensions.get("window");

const OasisHomeSearch = () => {
    return (
        <Container style= {styles.container}>
            <Header style = {styles.header}>
                <Image source={require("../../assets/logo.png")} style = {styles.oasisImage}/>
                <Text style= {{marginTop: 20}}>Encuentra tu serenidad</Text>
            </Header>
            <Content style={{marginTop:100, marginLeft:30, marginRight: 30}} >
                <Input placeholder="Ubicacion" style={styles.texto}/>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{height:10, flexDirection: 'row'}}/>
                    <View  style={{flex:10, flexDirection: 'row'}}>
                    <Text>Fecha de Entrada</Text>

                        </View>
                        <View  style={{flex:10, flexDirection: 'row'}}>
                        <Text>Fecha de Salida</Text>
                        </View>
                </View>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View  style={{height:10, flexDirection: 'row'}}/>
                    <View  style={{flex:10, flexDirection: 'row'}}>

                    <DatePicker/>
                        </View>
                        <View  style={{flex:10, flexDirection: 'row'}}>
                    <DatePicker/>
                        </View>
                </View>
                
                <Text>Habitacion para </Text>
                    <Input placeholder="Adultos" style={styles.texto}/>
                <Button style={styles.boton}>
                 <Text>Buscar</Text>
                </Button>

               
            </Content>
            <Image source={require("../../assets/Palmeritas.png")} style = {styles.palmerasImage}
            style={{marginLeft: 100}}/>
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
        height: 60
        //resizeMode: "header",
    },
    header :{ 
        backgroundColor: "#eb9284"
    },
    eslogan: {
        color: "#07263c",
        justifyContent: "center"
    },
    texto:{
        justifyContent: "center",
        alignContent:"center",
        backgroundColor: "#FFFFFF"
    },
    boton:{
        color: "#07263c",
        justifyContent: "center",
        alignContent:"center", 
        height : 50,
        width: 500
    },
    view:{
        backgroundColor: "#eb9284"
    },
    palmerasImage :{
        width: 70,
        height: 70,
        //resizeMode: "container"
        alignContent:"center",
        marginBottom: 40
    }
});

export default OasisHomeSearch;