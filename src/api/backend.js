// Importacion de axios 
import axios from "axios";
<<<<<<< HEAD

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
=======
import getEnvVars from "../../enviroment";

const { apiUrl } = getEnvVars();

const instance = axios.create({
    baseURL: apiUrl
    
});
export default instance;
>>>>>>> ae10efb6145df41576f3fc6a5eff2e0bb1f956dd
