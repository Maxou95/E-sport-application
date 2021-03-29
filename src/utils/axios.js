import axios from 'axios';

const api = "https://api.pandascore.co/lol/series?token=HcmfRra2T1ClgJuxLoAvzYIaKEpKoYqhEsfCzOnLvtC6Vzrx5AU";

const instance = axios.create({
    baseURL: api,
});

export default instance;