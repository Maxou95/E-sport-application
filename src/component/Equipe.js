import React, { Component } from 'react';

class Equipe extends Component{

    constructor(props) {
        super(props);
        this.state = {
            equipes: [],
        }
    } 
 
    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/teams?filter[id]='+this.props.match.params.id+'&token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU');
        const data = await reponse.json();
        this.setState({
            equipes: data
            
        })
    }

  render() {
    return(
        <div>
            {this.state.equipes.map(equipe =>
                <div>
                    <p className={"nom-equipe"}>{equipe.name} ({equipe.acronym})</p>
                    {equipe.players.map(player =>
                        <div className={"equipe"}>
                            <div className={"equipe-donnees"}>
                            <img style={{width:100,height:100}} src={player.image_url}></img>
                                <p>Nom : <span style={{fontWeight:900}}>{player.name}</span></p>
                                <p>Nationalité : <span style={{fontWeight:900}}>{player.nationality}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
  }
}

export default Equipe;