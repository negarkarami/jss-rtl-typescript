import React from 'react';
import logo from './logo.svg';
import './App.css';
import {create} from 'jss';
import rtl from 'jss-rtl';
// @ts-ignore
import {StylesProvider, jssPreset, ThemeProvider} from '@mui/styles';
import {createTheme, TextField} from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Configure JSS
const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

const cacheLtr = createCache({
    key: "muiltr"
});


const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin]
});

const ltrTheme = createTheme({direction: "ltr"});
const rtlTheme = createTheme({direction: "rtl"});

function RTL(props: { children: any; }) {
    return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

function App() {
    const [isRtl, setIsRtl] = React.useState(true);

    return (
        <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
            <RTL>
                <div dir={'rtl'} className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Hello World"
                        />
                    </header>
                </div>
            </RTL>
        </ThemeProvider>
        </CacheProvider>
    );
}

export default App;
