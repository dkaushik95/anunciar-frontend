import React from "react"
import { observer } from "mobx-react"
import AnnouncementList from "./AnnouncementList"
import {Card, CardHeader, CardText} from 'material-ui/Card'

@observer
export default class AnnouncementComponent extends React.Component {
    render(){
      var ret = this.props.anunciarStore.isLoggedIn === 'true' ? (
          <div>
            <AnnouncementList anunciarStore={this.props.anunciarStore} />
          </div>
        ) : (
          <Card style={{
              maxWidth: 800,
              margin: '20 auto',
            }}>
            <CardHeader
              title='Anunciar'
              subtitle='The only app you will need for your announcements'
              actAsExpander={false}
              showExpandableButton={false}
            />

            <CardText expandable={false}>
                You are seeing this page because you are not logged in or signed up. Do so by clicking any of the buttons above.
                And dont forget. Your app is now offline ready. Which means that you will never have to use more data for this app :)
            </CardText>
          </Card>
        )
        return ret
    }
}