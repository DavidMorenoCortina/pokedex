import React from 'react';
import Card from "../Card/Card";

function PokemonList(props){
    return(
        <div className={"row mt-2" + (props.selectedCard? ' selected-pokemon' : '')}>
            {props.pokemons.map(poke => <Card key={poke.id} pokemon={poke} isSelectedCard={props.selectedCard === poke.id}/>)}
        </div>
    );
}

export default PokemonList;