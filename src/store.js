import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers/gameReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const localState = localStorage.reduxState ? JSON.parse(localStorage.reduxState) : undefined;

const store = createStore(reducer, localState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
    localStorage.reduxState = JSON.stringify(store.getState());
});

export default store;