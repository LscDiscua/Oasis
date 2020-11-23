// Importacion de axios 
import axios from "axios";
// Importacion de enviroment 
import getEnvVars from "../../enviroment";

// Varibles necesarias para poder realizar la conexión de la API
const  { apiUrl , apiKey , apiHost , useQuery }  =  getEnvVars ( ) ;

// Funcion para realizar la conexion con la API
const instance = axios.create({
    baseURL : apiUrl ,
    encabezados : { 
        'x-rapidapi-key' : apiKey , 
        'x-rapidapi-host' : apiHost , 
        'useQueryString' : useQuery
    }
    
});
export default instance;
