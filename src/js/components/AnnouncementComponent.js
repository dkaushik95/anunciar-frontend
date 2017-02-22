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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga reiciendis natus dolor laudantium veniam necessitatibus error saepe tempore nobis rerum quos veritatis earum quidem itaque quis ducimus optio magnam suscipit, perspiciatis alias deleniti. At cum molestias quos autem illum voluptates eaque excepturi ad. Vero architecto maiores ipsa nobis blanditiis odio!
            </CardText>
          </Card>
        )
        return ret
    }
}