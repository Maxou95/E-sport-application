import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function League() {
    const [ligues, setLigues] = useState([])

    useEffect(() => {
        const fetchLigues = async () => {
            const res = await axios.get('https://api.pandascore.co/lol/leagues?token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU')
            setLigues(res.data);
        }
        fetchLigues();
    }, [])

    return (
        <div>
            {ligues.map(ligue =>
                <Link key={ligue.id} to={`/ligues/${ligue.id}`}>
                    <img src={ligue.image_url}></img>
                    <p>{ligue.name}</p>
                </Link>
            )}
        </div>
    );
}

export default League;