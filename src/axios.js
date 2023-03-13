import axios from "axios";


const deck = axios.create({
    baseURL: 'https://deckofcardsapi.com/api/'
})

export default deck