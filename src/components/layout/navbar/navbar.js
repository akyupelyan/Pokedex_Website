import React, { Component } from 'react'
import "./navbar.css";

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                    <a className="navbar-brand col-sm-3 col-md-2 mt-0 align-items-center">Art's Pokedex</a>
                </nav>
            </div>
        )
    }
}

