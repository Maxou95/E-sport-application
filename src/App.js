import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import League from './pages/league';
import Match from './components/Match';


function App() {
    return (
        <Router>
            <header>
                <div className="wrapper">
                    <h1 className="logo">E<span>Sports</span></h1>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to={'/leagues'} className="nav-link"> Leagues </Link></li>
                            <li><Link to={'/'} className="nav-link"> Inscription </Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route exact path='/leagues'>
                    <League />
                </Route>
                <Route path="/leagues/:id" components={Match}></Route>
            </Switch>
        </Router>
    );
}

export default App;
