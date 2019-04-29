import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Card extends Component{
    render(){
        let poke = this.props.pokemon,
            addedClassName = '',
            path = '/pokemon/' + poke.id;

        if(this.props.isSelectedCard){
            addedClassName = ' selected';
            path = '/';
        }

        return (
            <div className={"col-4" + addedClassName}>
                <Link to={path} className="card mb-2">
                    <div className="image">
                        <img src={poke.sprites.front_default} alt={poke.name}/>
                        <div className="poke-id">ID / {poke.id}</div>
                    </div>
                    <div className="info">
                        <h3>{poke.name}</h3>
                        <div className="types">
                            {poke.types.map(t => <div key={t.slot} className="type">{t.type.name}</div>)}
                        </div>
                        {poke.evolves_from_species &&
                            <div className="evolution-from">
                                Evoluciona de:
                                <span>{poke.evolves_from_species}</span>
                            </div>
                        }
                    </div>
                </Link>
            </div>
        );
    }
}