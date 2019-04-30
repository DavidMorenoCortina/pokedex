import React, {Component} from 'react';
import {connect} from "react-redux";
import PokemonList from "../Components/PokemonList/PokemonList";
import pokemonActions from "../action-creators/pokemons";
import Loading from "../Components/Loading";
import SearchBar from "../Components/SearchBar";

class Index extends Component{
    constructor(props) {
        super(props);
        this.loadSelectedCard = this.loadSelectedCard.bind(this);
    }

    componentWillMount() {
        this.loadSelectedCard();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadSelectedCard();
    }

    loadSelectedCard(){
        if(this.props.pokemonNames.length === 0){
            this.props.loadPokemonNames();
            return;
        }

        if(this.props.match.params.id) {
            let id = parseInt(this.props.match.params.id, 10);
            if (id > 0) {
                if (this.props.selectedCard === 0) {
                    this.props.selectCard(id);
                }else if(!this.props.routeMatch){
                    this.props.selectCard(0);
                    this.props.history.push('/');
                }
            } else {
                this.props.history.push('/');
            }
        }else if(this.props.selectedCard > 0){
            this.props.selectCard(0);
        }
    }

    render(){
        if(this.props.loadingData || this.props.loadingNamesData){
            return (
                <div>
                    <SearchBar/>
                    <Loading/>
                </div>
            );
        }

        return(
            <div>
                <SearchBar/>
                <PokemonList pokemons={this.props.pokemons} selectedCard={this.props.selectedCard} searchTerm={this.props.searchTerm}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pokemonNames: state.pokemons.pokemonNames,
    pokemons: state.pokemons.list,
    selectedCard: state.pokemons.selectedCard,
    loadingData: state.pokemons.loadingData,
    searchTerm: state.pokemons.searchTerm,
    routeMatch: state.pokemons.routeMatch
});

const mapDispatchToProps = ({
    selectCard: pokemonActions.selectCard,
    loadPokemonNames: pokemonActions.loadPokemonNames
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);