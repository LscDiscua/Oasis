import axios from "axios";

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
