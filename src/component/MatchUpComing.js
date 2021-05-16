import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
            bet: [],
            credit:0,
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/matches/upcoming?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matchs: data
        })

        const reponse2 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"));
        const data2 = await reponse2.json();

        const bet = [];
        for (let z = 0; z < data2.bet.length; z++) {
            bet.push(data2.bet[z].id_match);
        }

        this.setState({
            bet: bet,
            credit:data2.credit
        })



    }

    async handleInputChange(event) {
        const reponse1 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"));
        const data1 = await reponse1.json();

        var winner = "";
        var mise = document.getElementsByClassName(event)[0].children[0].children[3].children[1].value;
        if (document.getElementsByClassName(event)[0].children[0].children[2].children[0].checked == true) {
            winner = document.getElementsByClassName(event)[0].children[0].children[2].children[0].id;
        } else {
            winner = document.getElementsByClassName(event)[0].children[0].children[2].children[0].id;
        }

        var object = new Object();
        object.id_match = event;
        object.winner_id = winner;
        object.mise = mise;

        if (data1.bet.length == 0) {
            data1.bet.push(object);
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), bet: data1.bet})
            };
            const reponse = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"), requestOptions);

            const requestOptions4 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data1.credit-object.mise})
            };
            const reponse4 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"), requestOptions4);
        } else {
            var test = 0;
            for (let i = 0; i < data1.bet.length; i++) {

                if (data1.bet[i].id_match == object.id_match) {
                    test = 1;
                }

            }

            if (test == 0) {
                data1.bet.push(object);
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), bet: data1.bet})
                };
                const reponse = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"), requestOptions);

                const requestOptions4 = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data1.credit-object.mise})
                };
                const reponse4 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"), requestOptions4);
            }

        }

    }

    async verifier() {
        const reponse8 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"));
        const data8 = await reponse8.json();


        for (let o = 0; o < data8.bet.length; o++) {
            var match2 = data8.bet[o].id_match;
            var winner2 = data8.bet[o].winner_id;
            var mise2 = data8.bet[o].mise;

            const reponse9 = await fetch('https://api.pandascore.co/rl/matches?token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU&filter[id]='+match2);
            const data9 = await reponse9.json();

            if (data9[0].winner_id == winner2) {
                const requestOptions6 = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data8.credit+(mise2*2)})
                };
                const reponse6 = await fetch('http://localhost:3001/users/'+localStorage.getItem("id"), requestOptions6);
            }

        }
    }


    render() {
        return(
            <div>
                <p style={{fontWeight:700,fontSize:17,textAlign:"center"}}>Vous avez : {this.state.credit} dans votre panier</p>
                <button className={"btn-verifier"} onClick={() => this.verifier()}>Verifier le résultat du match</button>
                {this.state.matchs.map(match =>
                    <div>
                        {match.opponents.length > 0 &&
                        <div className={match.id}>
                            <div className={"match-pari"}>
                            <p className={"title-match"}>{match.name}</p>

                            {match.opponents.map(opponent =>

                                <div className={"pari-donnees"}>
                                    {this.state.bet.indexOf(match.id) === -1 ? <input id={opponent.opponent.id} type="button" name={match.id} value={opponent.opponent.id} /> : <div></div> }

                                    <Link key={opponent.opponent.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                                        <img id={"img-equipe"} src={opponent.opponent.image_url}></img>
                                    </Link>
                                </div>


                            )}

                            {this.state.bet.indexOf(match.id) === -1 ? <div className={"somme-pari"}><p>Vous misez :</p><input type="number" id={"input-pari"}/><button onClick={() => this.handleInputChange(match.id)}>Miser</button></div> : <div style={{color:"red",fontWeight:700,fontSize:17,textAlign:"center",}} >Hop hop hop, tu as déjà miser sur ce match. Attends de voir le résultat</div> }
                            </div>
                        </div>
                        }
                    </div>

                )}
            </div>
        )
    }
}
export default Match;