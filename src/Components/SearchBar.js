import React, {Component} from 'react';
import pokemonActions from "../action-creators/pokemons";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.checkPathSearchTerm = this.checkPathSearchTerm.bind(this);
    }

    componentWillMount() {
        this.checkPathSearchTerm();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkPathSearchTerm();
    }

    checkPathSearchTerm(){
        if(this.props.match.params.searchTerm && this.props.searchTerm !== this.props.match.params.searchTerm){
            this.props.search(this.props.match.params.searchTerm);
        }
    }

    search(e){
        this.props.search(e.target.value);
        this.props.selectCard(0);
    }

    render(){
        return (
            <div className="row mt-1">
                <div className="search-box col-12">
                    <input type="text"
                           name="search-pokemon"
                           placeholder="Filtra pokemons por nombre..."
                           value={this.props.searchTerm}
                           onChange={this.search}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchTerm: state.pokemons.searchTerm
});

const mapDispatchToProps = ({
    search: pokemonActions.search,
    selectCard: pokemonActions.selectCard
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));