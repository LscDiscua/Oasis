import axios from "axios";
<<<<<<< HEAD

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
=======
import getEnvVars from "../../enviroment";

const { apiUrl } = getEnvVars();

const instance = axios.create({
    baseURL: apiUrl
    
});
export default instance;
>>>>>>> ae10efb6145df41576f3fc6a5eff2e0bb1f956dd
