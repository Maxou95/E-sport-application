import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import League from './pages/league';
import Match from './components/Match';


function App() {
    return (
        <Router>

            <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Login </Link></li>
                <li><Link to={'/leagues'} className="nav-link"> Leagues </Link></li>
            </ul>

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
