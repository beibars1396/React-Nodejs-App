import { AuthToken } from "../../auth/authToken";
// import config from "../../../config";
import Axios from 'axios';
import moment from "moment";

declare var require: any

var Qs = require('qs');

const authAxios = Axios.create({
    // baseURL: config.backendUrl,
    // baseURL: 'http://192.168.1.37:8080/api', 
    // <-- toChange
    paramsSerializer: function (params) {

        return Qs.stringify(params, {
            arrayFormat: 'brackets',
            filter: (prefix, value) => {
                if(
                    moment.isMoment(value) || value instanceof Date
                ) {
                    return value.toISOString();
                }

                return value;
            }
        })
    }
});

authAxios.interceptors.request.use(
    async function (options) {
        const token = AuthToken.get();
        
        if(token)  {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        options.headers['Accept-Language'] = 'ru'

        return options
    }, function (error) {
        console.log('Request error:', error);
        return Promise.reject(error);
    }
)

export default authAxios;
