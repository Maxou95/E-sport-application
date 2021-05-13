import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
        }
    } 
 
    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/matches?filter[league_id]='+this.props.match.params.id+'&token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU');
        const data = await reponse.json();
        this.setState({
            matchs: data
            
        })
    }

  render() {
    return(
        <div>
            <button>
                    <Link class={"lien-jeux"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/past/${this.props.match.params.id}`}>Match passé</Link>
            </button>
            <button>
                <Link class={"lien-jeux"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/upcoming/${this.props.match.params.id}`}>Match à venir</Link>
            </button>
            <button>
                <Link class={"lien-jeux"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/running/${this.props.match.params.id}`}>Match en cours</Link>
            </button>
            {this.state.matchs.map(match =>
                <div className={"match"}>
                    <p className={"title-match"}>{match.name}</p>
                    {match.opponents.map(opponent =>
                        <Link key={opponent.opponent.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                            <img id={"img-equipe"} src={opponent.opponent.image_url}></img>
                        </Link>
                    )}
                    {match.winner != null &&
                        <p className={"vainqueur"}>Vainqueur : {match.winner.name}</p>
                    }
                </div>

            )}
        </div>
    )
  }
}
export default Match;