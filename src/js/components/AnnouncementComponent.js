import React from "react"
import { observer } from "mobx-react"
import AnnouncementList from "./AnnouncementList"

@observer
export default class AnnouncementComponent extends React.Component {

    render(){
        if (this.props.sessionStore.isLoggedIn === "true") {
            this.props.announcementStore.getAnnouncements()
            return <div>
                <AnnouncementList announcementStore={this.props.announcementStore} />
            </div>
        }
        else{
            return <h1> You are not logged in :( </h1>
        }

    }
}