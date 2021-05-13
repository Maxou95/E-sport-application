import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../component/home';
import '../App.css';

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const reponse = await fetch('http://localhost:3003/users');
        const data = await reponse.json();
        for (let i = 0; i < data.length; i++) {
            if(data[i].email == username && data[i].password == password){
                setUser(data[i]);
                localStorage.setItem("user", JSON.stringify(data[i]));
            }
        }
    };

    if (user) {
        return (
            <div>
                <Route exact path="/">
                    <Redirect to="/home" /> : <Home />
                </Route>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    value={username}
                    placeholder="enter a username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <div>
                    <label htmlFor="password">password: </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="enter a password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default App;