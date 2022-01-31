import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRedux from "./App-withRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                <AppWithRedux/>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
