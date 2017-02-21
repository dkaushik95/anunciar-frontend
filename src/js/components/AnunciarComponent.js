import React from "react"
import { observer } from "mobx-react"
import AnunciarHeader from './AnunciarHeader'

@observer
export default class AnunciarComponent extends React.Component {
    render(){
        return <div>
            <AnunciarHeader sessionStore={this.props.sessionStore} />
        </div>
    }
}