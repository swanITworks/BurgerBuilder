import axios from 'axios';

 const instance = axios.create({
     baseURL: 'https://burger-builder-89c84.firebaseio.com/'
 });

 export default instance;