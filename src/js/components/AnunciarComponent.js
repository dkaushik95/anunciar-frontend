import React from "react"
import { observer } from "mobx-react"
import AnunciarHeader from './AnunciarHeader'
import AnnouncementComponent from './AnnouncementComponent'
import AnnouncementAddComponent from './AnnouncementAddComponent'


const style = {
    position: 'fixed',
    bottom: 10,
    right: 10
}

@observer
export default class AnunciarComponent extends React.Component {
    render(){
        return <div>
            <AnunciarHeader anunciarStore={this.props.anunciarStore} />
            <AnnouncementComponent anunciarStore={this.props.anunciarStore} />
            {this.props.anunciarStore.isLoggedIn == 'true' && this.props.anunciarStore.user.role == 'admin' ? (
                <AnnouncementAddComponent anunciarStore={this.props.anunciarStore} />
                ):(<div></div>)}
        </div>
    }
}