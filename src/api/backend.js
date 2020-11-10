import axios from "axios";
<<<<<<< HEAD
import getEnvVars from "../../enviroment";

const { apiUrl } = getEnvVars();

const instance = axios.create({
    baseURL: apiUrl
    
});
export default instance;
=======

import getEnvVars from "../../enviroment"


const { apiUrl, apiKey, apiHost, useQuery } = getEnvVars();


const instance = axios.create({

    baseURL: apiUrl,
    headers: { 
        'x-rapidapi-key': apiKey, 
        'x-rapidapi-host': apiHost, 
        'useQueryString': useQuery

      }

});

export default instance;
>>>>>>> 0267cdaccf5ff1e25e38bc424d60eea68ae70cec
