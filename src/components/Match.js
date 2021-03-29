import axios from 'axios';
import React, { Component } from 'react';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/lol/matches?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matches: data

        })
    }

    render() {
        return(
            <div>
                {this.state.matches.map(matche =>
                    <div>
                        <p>{matche.name}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Match;