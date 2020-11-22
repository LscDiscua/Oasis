// Importacion de axios 
import axios from "axios";

// importacion de la variable proveniente de la enviroment
import getEnvVars from "../../enviroment"

// Varibles necesarias para poder realizar la conexion de la API
const { apiUrl, apiKey, apiHost, useQuery } = getEnvVars();

// Funcion que contiene la creacion de conexion de axios
// a nuestra aplicacion
const instance = axios.create({

    baseURL: apiUrl,
    headers: { 
        'x-rapidapi-key': apiKey, 
        'x-rapidapi-host': apiHost, 
        'useQueryString': useQuery

      }

});

// Exporta la funcion para que pueda ser utilizada en en manejo
export default instance;
