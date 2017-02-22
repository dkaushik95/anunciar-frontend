import React from "react"
import { observer } from "mobx-react"
import FlatButton from 'material-ui/FlatButton'
import AnnouncementListItem from './AnnouncementListItem'

@observer
export default class AnnouncementList extends React.Component {
    componentDidMount(){
      if(this.props.anunciarStore.isOnline){
        this.props.anunciarStore.getAnnouncements()
      }
    }
    render(){
        var {announcements} = this.props.anunciarStore
        var ListItems = announcements.map(function(currentVal){
          return <AnnouncementListItem key={currentVal.id} announcement={currentVal} />
        })
        return <div style={{
              maxWidth: 800,
              margin: '1 auto',
              paddingTop: 20
            }}>
          {ListItems}
        </div>
    }
}