import axios from 'axios'

const url = 'http://localhost:8000'

export const getUsers =()=>{
    return axios.get(`${url}/users/display`).then(res => res.data)
}

export const register =(name, email, password, mobile)=>{
    return axios.post(`${url}/users/register`,{name, email, password, mobile}).then(res => res.data)
}