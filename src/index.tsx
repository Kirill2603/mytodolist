import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRedux from "./App-withRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ChakraProvider} from "@chakra-ui/react";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <AppWithRedux/>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
