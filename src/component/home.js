import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
    render() {
        let game = [{id:'fifa', nom:'fifa'},{id:'lol', nom:'League of Legends'},{id:'rl', nom:'Rocket League'},{id:'pubg', nom:'pubg'},{id:'ow', nom:'Overwatch'},];
        return(
            <div>
                <p class={"titre-jeux"}>Liste des jeux : </p>
                        {game.map(game =>
                            <ul>
                                <li><Link class={"lien-jeux"} key={game.id} to={`/div/${game.id}`}>{game.nom}</Link></li>
                            </ul>

                        )}
            </div>
        )
    }
}

export default Home;