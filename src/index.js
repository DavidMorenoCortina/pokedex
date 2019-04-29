import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './sass/pokedex.scss';
import {createBrowserHistory} from "history";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import createRootReducer from './reducers'
import {Provider} from "react-redux";
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';

const history = createBrowserHistory();

const store = createStore(createRootReducer(history), applyMiddleware(thunk, routerMiddleware(history)));

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
