import axios from 'axios';

const token = localStorage.getItem('happyToken');


const headers = {
  authorization: ''
}

if(token){
  headers.authorization = `Bearer ${token}`;
}

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers
})