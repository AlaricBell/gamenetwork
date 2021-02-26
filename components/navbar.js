import React, {Component} from 'react';
import Link from 'next/link';
import {getAllGameData} from '../lib/games';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
    state = {
        games: []
    }

    componentDidMount() {
        this.setState(() => {
            return {
                games: [...getAllGameData()]
            }
        })
    }

    generateUri = (title) => {
        return `/form/${title}`;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <Link href="/"><a className="navbar-brand"><FontAwesomeIcon icon={faGamepad} />Gamernetwork</a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {this.state.games.map((game, index) => (
                            <li key={index} className="nav-item">
                                <Link href={this.generateUri(game.name)}><a className="nav-link" aria-current="page" >{game.displayName}</a></Link>
                            </li>
                        ))}
                        
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
    
  }