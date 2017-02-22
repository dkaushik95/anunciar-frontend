import React from "react"
import { observer } from "mobx-react"

@observer
export default class AnnouncementComponent extends React.Component {
    render(){
        return <div>
            Hello from Announcements!
        </div>
    }
}