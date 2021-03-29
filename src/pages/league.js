import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function League() {
    const [leagues, setleagues] = useState([])

    useEffect(() => {
        const fetchleagues = async () => {
            const res = await axios.get('https://api.pandascore.co/lol/leagues?token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU')
            setleagues(res.data);
        }
        fetchleagues();
    }, [])

    return (
        <div>
            {leagues.map(league =>
                <Link key={league.id} to={`/leagues/${league.id}`}>
                    <img src={league.image_url} id="img-league"></img>
                    <p>{league.name}</p>
                </Link>
            )}
        </div>
    );
}

export default League;