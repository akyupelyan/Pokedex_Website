import React, { Component } from 'react'
import axios from 'axios';

import PokeList from '../../pokemon/PokeList';
import Pagination from '../pagination/pagination'

export default class Dashboard extends Component {

    state= {
        url: "https://pokeapi.co/api/v2/pokemon/",
        pokemon: null,
        limit: 20,
        offset: 0,
        hasPrevPage: false,
        hasNextPage: false

    };

    async componentDidMount() {
        const config = {
            params: {
                limit: this.state.limit,
                offset: this.state.offset
            },
        };
        const res = await axios.get(this.state.url, config);
        this.setState({pokemon: res.data['results'], hasPrevPage: res.data.previous !== null, hasNextPage: res.data.next !== null});
        console.log(res.data);
    }

    goNextPage= async (e) => {
        const newOffset = this.state.offset + this.state.limit;
        const config = {
            params: {
                limit: this.state.limit,
                offset: newOffset
            },
        };
        const res = await axios.get(this.state.url, config);
        this.setState({pokemon: res.data['results'], offset: newOffset, hasPrevPage: res.data.previous !== null, hasNextPage: res.data.next !== null});
        console.log(res.data);

    };

    goPrevPage= async (e) => {
        const prevOffset = this.state.offset - this.state.limit;
        const config = {
            params: {
                limit: this.state.limit,
                offset: prevOffset
            },
        };
        const res = await axios.get(this.state.url, config);
        this.setState({pokemon: res.data['results'], offset: prevOffset, hasPrevPage: res.data.previous !== null, hasNextPage: res.data.next !== null});
        console.log(res.data);

    };

    render() {
        return (
            <div className="row">
                <div className="col">
                    <PokeList pokemon={this.state.pokemon}/>
                    <Pagination
          goNextPage={this.goNextPage}
          goPrevPage={this.goPrevPage}
          hasNextPage={this.state.hasNextPage}
          hasPrevPage={this.state.hasPrevPage}
        /> 
                </div>
            </div>
        )
    }
}
