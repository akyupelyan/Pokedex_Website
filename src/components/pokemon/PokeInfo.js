import React, { Component } from 'react'
import axios from 'axios';

import './pokemon.css';

const type_colors = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
}

export default class PokeInfo extends Component {
    state = {
        name: '',
        pokeIndex: '',
        imageURL: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            atk: '',
            def: '',
            spatk: '',
            spdef: '',
            spd: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioM: '',
        genderRatioF: '',
        evs: '',
        hatchSteps: '',

    };

    async componentDidMount() {
        const {pokeIndex} = this.props.match.params;

        const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}/`;
        const pokeSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokeIndex}/`;

        const pokeRes = await axios.get(pokeURL);

        const name = pokeRes.data.name;
        const imageURL = pokeRes.data.sprites.front_default;

        let {hp, atk, def, spatk, spdef, spd} = '';

        pokeRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    atk = stat['base_stat'];
                    break;
                case 'defense':
                    def = stat['base_stat'];
                    break;
                case 'special-attack':
                    spatk = stat['base_stat'];
                    break;
                case 'special-defense':
                    spdef = stat['base_stat'];
                    break;
                case 'speed':
                    spd = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        const height = Math.round(pokeRes.data.height * 0.328084);
        const weight = Math.round(pokeRes.data.weight * 0.220462);

        const types = pokeRes.data.types.map(type => type.type.name);

        const abilities = pokeRes.data.abilities.map(ability => {
            return ability.ability.name;
        }).join(', ');

        const evs = pokeRes.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            } else {
                return false;
            }
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`;
        }).join(',');

        await axios.get(pokeSpecies).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femChance = res.data['gender_rate'];
            const genderRatioF = femChance * 12.5;
            const genderRatioM = (8 - femChance) * 12.5;

            const catchRate = Math.round(res.data['capture_rate'] * (100/255));

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name;
            }).join(", ");

            const hatchSteps = (res.data['hatch_counter'] + 1) * 255;

            this.setState({
                description,
                genderRatioF,
                genderRatioM,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });

        this.setState({
            name,
            pokeIndex,
            imageURL,
            types,
            stats: {
                hp,
                atk,
                def,
                spatk,
                spdef,
                spd
            },
            height,
            weight,
            abilities,
            evs
        });
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                            <h5 className="pokeName mx-auto">{this.state.name}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => (
                                        <span 
                                        key={type} 
                                        className="badge badge-pill mr-1  type-badge text-capitalize"
                                        style= {{
                                            backgroundColor: `#${type_colors[type]}`
                                        }}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src={this.state.imageURL} className="card-img-top rounded mx-auto mt-2"></img>
                            </div>
                            <div className="col-md-9">
                
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        HP
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.hp}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Attack
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.atk}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.atk}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Defense
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.def}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.def}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Special Attack
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.spatk}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.spatk}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Special Defense
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.spdef}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.spdef}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Speed
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                            className="progress-bar" 
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.stats.spd}%`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.spd}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <p className="p-2">{this.state.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="card-body">
                        <h5 className="card-title">Additional Information:</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Height:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left">{this.state.height} ft.</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Weight:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left">{this.state.weight} lbs.</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Catch Rate:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left">{this.state.catchRate}%</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Gender Ratio:</h6>
                                    </div>
                                    <div className="col-6">
                                        <div className="progress">
                                            <div className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.genderRatioF}%`,
                                                    backgroundColor: '#FF69B4'
                                                }}
                                                aria-valuenow="15"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.genderRatioF}</small>
                                            </div>
                                            <div className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.genderRatioM}%`,
                                                    backgroundColor: '#1976D2'
                                                }}
                                                aria-valuenow="30"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.genderRatioM}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Abilities:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left text-capitalize">{this.state.abilities}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Egg Groups:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left text-capitalize">{this.state.eggGroups}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">Hatch Steps:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left">{this.state.hatchSteps}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="float-right">EVs:</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="float-left text-capitalize">{this.state.evs}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        Data From: <a href='https://pokeapi.co/' target="_blank" className="card-link">PokeAPI</a>
                    </div>
                </div>
            </div>
        )
    }
}
