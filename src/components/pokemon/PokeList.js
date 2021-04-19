import React, { Component } from 'react';
import './pokemon.css'

import PokeCard from './PokeCard';

export default class PokeList extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.pokemon ? (
                <div className="row">
                    {this.props.pokemon.map(pokemon => (
                        <PokeCard 
                            key = {pokemon.name}
                            name = {pokemon.name}
                            url = {pokemon.url}
                        />
                    ))}
                </div>
                ) : (
                    <h1>Loading Pokemon</h1>
                )}
            </React.Fragment>
            
        );
    }
}
