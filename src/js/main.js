import injectTapEventPlugin from 'react-tap-event-plugin'
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

// ENABLE THIS AFTER DEVELOPMENT IS COMPLETE
if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('./service-worker.js')
        .then((r) =>{
            console.log('Service worker enabled' + r)
        })
        .catch((e) =>{
            console.log('Service worker failed' + e)
        })
}
else{
    console.log('No service worker')
}

ReactDOM.render(<App />, app)