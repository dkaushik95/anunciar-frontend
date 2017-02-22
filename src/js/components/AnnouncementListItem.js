import React from "react"
import { observer } from "mobx-react"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import timeago from 'time-ago'
import countdown from 'countdown'

@observer
export default class AnnouncementListItem extends React.Component {
    render(){
        var ta = timeago()
        return(
          <Card>
            <CardHeader
              title={this.props.announcement.title}
              subtitle={ta.ago(this.props.announcement.created_at)}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <FlatButton label={this.props.announcement.deadline} />
            </CardActions>
            <CardText expandable={true}>
              {this.props.announcement.description}
            </CardText>
          </Card>)
    }
}