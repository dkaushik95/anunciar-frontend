import injectTapEventPlugin from 'react-tap-event-plugin'
import "../css/main.css"
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactDOM from "react-dom"

import AnunciarComponent from "./components/AnunciarComponent"
import anunciarStore from "./stores/AnunciarStore"

const App = () =>(
    <MuiThemeProvider>
        <AnunciarComponent anunciarStore={anunciarStore} />
    </MuiThemeProvider>
)
const app = document.getElementById('app')
injectTapEventPlugin();
ReactDOM.render(<App />, app)