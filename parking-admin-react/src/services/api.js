import axios from 'axios'
import CONFIG from 'config';

var api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': `JWT ${localStorage.getItem('token')}`
    }
})

export default api
