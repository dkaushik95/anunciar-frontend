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

// Three components here,
// A header which holds the logic for login and logout and show the current user and its role
// The Announcement Component which will contain the list of announcements
// Ann FAB if the account which is logged is an admin, for adding new announcements.
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