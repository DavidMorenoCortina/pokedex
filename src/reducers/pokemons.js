import update from 'immutability-helper';
import actionTypes from '../action-types/pokemons';
import fixture from '../fixture';

const initialState = {
    list: fixture,
    selectedCard: 0
};

const pokemons = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_CARD:
            return update(state, {selectedCard: {$set: action.payload.pokemonId}});
        default:
            return state;
    }
};

export default pokemons;