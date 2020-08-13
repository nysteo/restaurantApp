import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import RestaurantPage from 'pages/RestaurantPage';
import App from './App';

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/RestaurantPage" component={RestaurantPage} />
                </Switch>
            </Router>
        )
    }
}