import React from "react"
import { observer } from "mobx-react"
import AnunciarHeader from './AnunciarHeader'
import AnnouncementComponent from './AnnouncementComponent'

@observer
export default class AnunciarComponent extends React.Component {
    render(){
        return <div>
            <AnunciarHeader sessionStore={this.props.sessionStore} />
            <AnnouncementComponent announcementStore={this.props.announcementStore} />
        </div>
    }
}