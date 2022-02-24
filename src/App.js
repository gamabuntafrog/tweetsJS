import logo from './logo.svg';
import './App.css';
import tweets from './tweets.csv';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Papa from 'papaparse'
import {useEffect, useState} from "react";
import Tweets from "./Components/Tweets";
import Navigation from "./Components/Navigation";
import Sentiment from "./Components/Sentiment";
import Reasons from "./Components/Reasons";

var $ = require("jquery")


function App() {



  return (
    <div className={'App'}>
    <Router>
        <Navigation />
        <Switch>
            <Route path={'/Tweets'}>
                <Tweets />
            </Route>
            <Route path={'/Sentiment'}>
                <Sentiment />
            </Route>
            <Route path={'/Reasons'}>
                <Reasons />
            </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
