import axios from "axios";

const client = axios.create();

client.defaults.baseURL = 'http://localhost:8080/api/v1/'

export default client;