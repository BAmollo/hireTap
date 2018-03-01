import { createStore, applyMiddleware } from 'redux';
import reducers from './components/reducers';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';

export default createStore( reducers, applyMiddleware( promiseMiddleware() ) );