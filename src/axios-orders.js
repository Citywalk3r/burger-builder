import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-2eb4f.firebaseio.com/'
})

export default instance