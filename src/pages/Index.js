import React, {Component} from 'react';
import {connect} from "react-redux";
import PokemonList from "../Components/PokemonList/PokemonList";
import pokemonActions from "../action-creators/pokemons";

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
        if(this.props.match.params.id) {
            let id = parseInt(this.props.match.params.id, 10);
            if (id > 0) {
                if (this.props.pokemons.length > 0 && this.props.selectedCard === 0) {
                    let card = this.props.pokemons.filter(p => parseInt(p.id, 10) === id);
                    if (card.length > 0) {
                        this.props.selectCard(id);
                    } else {
                        this.props.history.push('/');
                    }
                }
            } else {
                this.props.history.push('/');
            }
        }else{
            this.props.selectCard(0);
        }
    }

    render(){
        return(
            <div>
                <PokemonList pokemons={this.props.pokemons} selectedCard={this.props.selectedCard}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pokemons: state.pokemons.list,
    selectedCard: state.pokemons.selectedCard
});

const mapDispatchToProps = ({
    selectCard: pokemonActions.selectCard
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);