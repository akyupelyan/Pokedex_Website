import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './pokemon.css'

import spinner from '../pokemon/spin.gif'

export default class PokeCard extends Component {
   state = {
       name: '',
       imageURL: '',
       pokeIndex: '',
       imgLoad: true,
       loadErr: false
   }

   componentDidMount() {
       const name = this.props.name;
       const url = this.props.url;
       const pokeIndex = url.split("/")[url.split('/').length - 2];
       const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokeIndex}.png?raw=true`;

       this.setState({name: name, 
                    imageURL: imageURL,
                    pokeIndex: pokeIndex
                });
   }

    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <Link to={`pokemon/${this.state.pokeIndex}`} style={{color: '#000'}}>
                    <div className="card">
                        <h4 className="card-header">{this.state.pokeIndex}</h4>

                        {this.state.imgLoad ? (
                            <img src={spinner} style={{width: '5em', height: '5em'}} className="card-img-top rounded mx-auto d-block mt-2"></img>
                        ) : null}

                        {this.state.loadErr ? (<h6 className="mx-auto">
                            <span className="badge badge-danger mt-2">Loading Error</span>
                         </h6>)
                         : null}

                        <div className="card-body mx-auto">
                            <h5 className="pokeName">{this.state.name}</h5>
                            <img className="pokeImage" src={this.state.imageURL} 
                            onLoad={() => this.setState({imgLoad: false})} 
                            onError={() => this.setState({loadErr: true})}
                            style={this.state.loadErr ? { display: "none"} : this.state.imgLoad ? null : {display: 'block'}}></img>
                        </div>

                    </div>
                </Link>
            </div>
        )
    }
}
