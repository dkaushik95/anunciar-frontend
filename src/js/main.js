import injectTapEventPlugin from 'react-tap-event-plugin'
import "../css/main.css"
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactDOM from "react-dom"

import AnunciarComponent from "./components/AnunciarComponent"
import anunciarStore from "./stores/AnunciarStore"

anunciarStore.updateInfo()
//This is the main app component, all it is doing is taking the store from Aunciar and passing it to others as a prop.
const App = () =>(
    //This is for theming the app. Will have to change this later.
    <MuiThemeProvider>
        <AnunciarComponent anunciarStore={anunciarStore} />
    </MuiThemeProvider>
)
const app = document.getElementById('app')
//This line is for the touch events to work for material-ui plugin
injectTapEventPlugin();
ReactDOM.render(<App />, app)