import React from 'react'
import ReactDOM from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import App from '@features/app';
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from './theme'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </React.StrictMode>
)

reportWebVitals();


