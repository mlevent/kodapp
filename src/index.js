import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import settingsReducer from './store/settings';

const reducers = combineReducers({ settings: settingsReducer });
const store = createStore(reducers);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
