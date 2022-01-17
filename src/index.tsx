import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from "./App-withRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {GetTasks, GetTodoLists} from "./state/testApi";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
            <GetTodoLists />
            <GetTasks />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
