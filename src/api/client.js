import axios from "axios";

const client = axios.create();

client.defaults.baseURL = 'http://udhd.djbaek.com:8080/api/v1/'

export default client;