import React, {useEffect, useState} from "react"

import {StyleSheet, View, Text, FlatList} from "react-native";

import {
    Container
}
from "native-base";

//import backend from "../api/backend";
//import getEnvVars from "../../enviroment";

//const {apiUrl} = getEnvVars();

const OasisInfoHotels = () => {
    return(
        <Container>
            <View style={{flex:1, justifyContent: "center"}}>
                <Text>
                    Hola
                </Text>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({

});

export default OasisInfoHotels;