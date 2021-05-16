import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Ligue from './component/ligue';
import Match from './component/Match';
import Equipe from './component/Equipe';
import Home from './component/home';
import MatchPast from './component/MatchPast';
import MatchUpComing from './component/MatchUpComing';
import MatchRunning from './component/MatchRunning';
function App() {
  return (
    <Router>
        <header>
            <div className="wrapper">
                <h1 className="logo">E<span>Sports</span></h1>
                <nav className="main-nav">
                    <ul>
                        <li><Link to={'/'} className="nav-link"> Connexion </Link></li>
                        <li><Link to={'/home'} className="nav-link"> Liste des jeux </Link></li>
                        <li>{}</li>
                    </ul>
                </nav>
            </div>
        </header>


      <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path="/div/:game" component={Ligue}></Route>
          <Route path="/:game/ligues/:id" component={Match}></Route>
          <Route path="/:game/equipe/:id" component={Equipe}></Route>
          <Route path="/:game/past/:id" component={MatchPast}></Route>
          <Route path="/:game/upcoming/:id" component={MatchUpComing}></Route>
          <Route path="/:game/running/:id" component={MatchRunning}></Route>
      </Switch>
    </Router>
  );
}

export default App;
