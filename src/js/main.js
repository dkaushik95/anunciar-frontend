import injectTapEventPlugin from 'react-tap-event-plugin'
import "../css/main.css"
import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactDOM from "react-dom"

import AnunciarComponent from "./components/AnunciarComponent"
import sessionStore from "./stores/SessionStore"
import announcementStore from "./stores/AnnouncementStore"

const App = () =>(
    <MuiThemeProvider>
        <AnunciarComponent sessionStore={sessionStore} announcementStore={announcementStore} />
    </MuiThemeProvider>
)
const app = document.getElementById('app')
injectTapEventPlugin();
ReactDOM.render(<App />, app)