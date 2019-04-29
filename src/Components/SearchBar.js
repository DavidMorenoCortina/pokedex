import React, {Component} from 'react';

class SearchBar extends Component{
    render(){
        return (
            <div className="row mt-1">
                <div className="search-box col-12">
                    <input type="text" name="search-pokemon" placeholder="Filtra pokemons por nombre..."/>
                </div>
            </div>
        )
    }
}

export default SearchBar;