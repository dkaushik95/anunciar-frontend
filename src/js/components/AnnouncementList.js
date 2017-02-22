import React from "react"
import { observer } from "mobx-react"
import FlatButton from 'material-ui/FlatButton'
import AnnouncementListItem from './AnnouncementListItem'
import RefreshIndicator from 'material-ui/RefreshIndicator';


const style = {
  refresh: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  },
};

// here is the problem, when I login, there is an error which is called that while it is performing the AJAX request for the
// announcement, it checks for the announcement whose value is null, so I get an error, I have resolved the issue for now by
// showing the RefreshIndicator, but I cannot call the getAnnouncement function which exists on the Store to get my data.

@observer
export default class AnnouncementList extends React.Component {
    componentDidMount(){
      if(this.props.anunciarStore.isOnline){
        this.props.anunciarStore.getAnnouncements()
      }
    }
    render(){
        var {announcements} = this.props.anunciarStore
        if(announcements != null){
          var ListItems = announcements.map(function(currentVal){
            return <AnnouncementListItem key={currentVal.id} announcement={currentVal} />
          })
        }
        else{
          var ListItems = <RefreshIndicator
                  size={50}
                  loadingColor="#FF9800"
                  status="loading"
                  style={style.refresh}
                />
          // this.props.anunciarStore.getAnnouncements()
          // No can do!
        }
        return <div style={{
              maxWidth: 800,
              margin: '1 auto',
              paddingTop: 20
            }}>
          {ListItems}
        </div>
    }
}