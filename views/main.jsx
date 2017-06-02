"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, browserHistory } from 'react-router'

import DinningComponent from './dinningComponent'
import HallComponent from './hallComponent'
import KitchenComponent from './kitchenComponent'


require('babel-polyfill')
function errorLoading(err) {
    console.error('Dynamic page loading failed', err);
}
function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

const routes = <Router history={browserHistory}>
    <Route path={'/dinning.html'} component={DinningComponent} />
    <Route path={'/hall'} component={HallComponent} />
    <Route path={'/kitchen'} component={KitchenComponent} />
</Router>


ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    <div id="dinning"></div>
)