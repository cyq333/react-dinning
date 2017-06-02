import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import DinningComponent from './components/dinningComponent.jsx';
import HallComponent from './components/hallComponent.jsx';
import KitchenComponent from './components/kitchenComponent.jsx';
//import routes from './routes';

// Router.run(routes, Router.HistoryLocation, function (Handler) {
//     React.render(<Handler />, document.getElementById('app'));
// });

require('babel-polyfill')
function errorLoading(err) {
    console.error('Dynamic page loading failed', err);
}
function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

const routes = <Router history={browserHistory}>
    <Route path={'/'} component={DinningComponent} />
    <Route path={'/hall'} component={HallComponent} />
    <Route path={'/kitchen'} component={KitchenComponent} />
</Router>


ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
)