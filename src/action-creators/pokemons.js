import actionTypes from '../action-types/pokemons';
import api from '../api/api';

const actions = {
    selectCard: (pokemonId) => ({
        type: actionTypes.SELECT_CARD,
        payload: {
            pokemonId
        }
    }),

    loadPokemonNames: () => {
        return (dispatch, store) => {
            if(!store().pokemons.loadingNamesData) {
                dispatch({
                    type: actionTypes.LOADING_NAMES_DATA,
                    payload: {
                        loading: true
                    }
                });

                api.getPokemonNames().then(response => {
                    dispatch({
                        type: actionTypes.SET_NAME_LIST,
                        payload: {
                            list: response.results
                        }
                    });

                    dispatch({
                        type: actionTypes.LOADING_NAMES_DATA,
                        payload: {
                            loading: false
                        }
                    });

                    window.localStorage.setItem('pokemonNames', JSON.stringify(response.results));
                    if (store().pokemons.searchTerm.length > 0) {
                        actions.search(store().pokemons.searchTerm)(dispatch, store);
                    }
                });
            }
        };
    },

    search: (searchTerm) => {
        return (dispatch, store) => {
            dispatch({
                type: actionTypes.LOADING_DATA,
                payload: {
                    loading: true
                }
            });

            searchTerm = searchTerm.toLowerCase();

            dispatch({
                type: actionTypes.SEARCH,
                payload: {
                    value: searchTerm
                }
            });

            let matchNames;
            if(searchTerm.length > 0) {
                matchNames = store().pokemons.pokemonNames.filter(p => !!p.name.match(searchTerm));
            }else{
                matchNames = [];
            }

            actions.loadPokemons(matchNames.slice(0, 9))(dispatch, store);
        };
    },

    loadPokemons: (pokemonRequest) => {
        return (dispatch, store) => {
            let pokemons = 0;

            if(pokemonRequest.length === 0){
                actions.showSearch()(dispatch, store);
            }

            pokemonRequest.forEach(poke => {
                try {
                    let pokeData = JSON.parse(window.localStorage.getItem(poke.url));

                    if (pokeData && pokeData.id) {
                        pokemons++;

                        if(pokemons === pokemonRequest.length){
                            actions.showSearch()(dispatch, store);
                        }

                        return;
                    }
                }catch (e) {

                }

                api.getPokemonData(poke.url).then(pokeDetailResponse => {
                    api.getEvolvesFrom(pokeDetailResponse.species.url).then(evolvesResponse => {
                        let pokeData = {
                            id: pokeDetailResponse.id,
                            name: pokeDetailResponse.name,
                            sprites: pokeDetailResponse.sprites,
                            types: pokeDetailResponse.types,
                            evolves_from_species: evolvesResponse.evolves_from_species ? evolvesResponse.evolves_from_species.name : null
                        };
                        window.localStorage.setItem(poke.url, JSON.stringify(pokeData));

                        pokemons++;

                        if(pokemons === pokemonRequest.length){
                            actions.showSearch()(dispatch, store);
                        }
                    });
                });
            });
        };
    },

    showSearch: () => {
        return (dispatch, store) => {
            let matchNames,
                searchTerm = store().pokemons.searchTerm,
                pokemons = [],
                routeMatch = true;

            if(searchTerm.length > 0) {
                matchNames = store().pokemons.pokemonNames.filter(p => !!p.name.match(searchTerm));

                pokemons = matchNames.slice(0, 9).map(poke => {
                    let pokeData = JSON.parse(window.localStorage.getItem(poke.url));

                    if(pokeData && pokeData.id) {
                        return pokeData;
                    }else{
                        return null;
                    }
                });

                pokemons = pokemons.filter(p => p != null);

                if(!pokemons){
                    pokemons = [];
                }

                let pokeId = store().pokemons.selectedCard;
                if(pokeId > 0 && pokemons.filter(p => p.id === pokeId).length === 0){
                    routeMatch = false;
                }
            }

            dispatch(actions.setRouteMatch(routeMatch));

            dispatch({
                type: actionTypes.SET_LIST,
                payload: {
                    list: pokemons
                }
            });

            dispatch({
                type: actionTypes.LOADING_DATA,
                payload: {
                    loading: false
                }
            });
        };
    },

    setRouteMatch: (routeMatch) => ({
        type: actionTypes.SET_ROUTE_MATCH,
        payload: {
            routeMatch
        }
    })
};

export default actions;