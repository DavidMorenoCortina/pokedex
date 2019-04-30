import update from 'immutability-helper';
import actionTypes from '../action-types/pokemons';

const initialState = {
    pokemonNames: [],
    list: [],
    selectedCard: 0,
    searchTerm: '',
    loadingData: false,
    routeMatch: true
};

const pokemons = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_CARD:
            return update(state, {selectedCard: {$set: action.payload.pokemonId}});
        case actionTypes.SEARCH:
            return update(state, {searchTerm: {$set: action.payload.value}});
        case actionTypes.SET_LIST:
            return update(state, {list: {$set: action.payload.list}});
        case actionTypes.SET_NAME_LIST:
            return update(state, {pokemonNames: {$set: action.payload.list}});
        case actionTypes.LOADING_DATA:
            return update(state, {loadingData: {$set: action.payload.loading}});
        case actionTypes.LOADING_NAMES_DATA:
            return update(state, {loadingNamesData: {$set: action.payload.loading}});
        case actionTypes.SET_ROUTE_MATCH:
            return update(state, {routeMatch: {$set: action.payload.routeMatch}});
        default:
            return state;
    }
};

export default pokemons;