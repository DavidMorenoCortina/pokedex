import {checkStatus, parseJSON} from "./utils";

const API_DOMAIN = 'https://pokeapi.co/api/v2';

const api = {
    getPokemonNames: () => {
        return fetch(API_DOMAIN + '/pokemon?offset=0&limit=1000', {
            method: 'get'
        }).then(checkStatus)
            .then(parseJSON)
    },
    getPokemonData: (url) => {
        return fetch(url, {
            method: 'get'
        }).then(checkStatus)
            .then(parseJSON)
    },
    getEvolvesFrom: (url) => {
        return fetch(url, {
            method: 'get'
        }).then(checkStatus)
            .then(parseJSON)
    }
};

export default api;