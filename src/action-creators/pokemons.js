import actionTypes from '../action-types/pokemons';

const actions = {
    selectCard: (pokemonId) => ({
        type: actionTypes.SELECT_CARD,
        payload: {
            pokemonId
        }
    })
};

export default actions;