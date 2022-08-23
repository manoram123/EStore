import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './redux/reducers/combinedReducers';

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');

const store = createStore(allReducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
