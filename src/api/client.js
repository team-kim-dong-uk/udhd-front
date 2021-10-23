import axios from "axios";
const client = axios.create();
client.defaults.baseURL = `${process.env.REACT_APP_BACKEND_PREFIX}/api/v1/`
export default client;