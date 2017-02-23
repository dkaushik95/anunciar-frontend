import React from "react"
import { observer } from "mobx-react"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import timeago from 'time-ago'
import AddToCalendar from 'react-add-to-calendar'

const style={
  margin: '3 auto'
}
@observer
export default class AnnouncementListItem extends React.Component {
    render(){
        var { announcement } = this.props
        let icon = { 'calendar-plus-o': 'left' };
        let event = {
            title: announcement.title,
            description: announcement.description,
            location: 'Work',
            startTime: announcement.deadline,
            endTime: announcement.deadline
        };
        let items = [
           { outlook: 'Windows' },
           { google: 'Android' },
           { apple: 'iPhone' },
        ]
        var ta = timeago()
        return(
          <Card style={style}>
            <CardHeader
              title={this.props.announcement.title}
              subtitle={ta.ago(this.props.announcement.created_at)}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              {announcement.deadline ? <AddToCalendar
                buttonLabel= "Add to calendar"
                event={event}
                buttonTemplate={icon}
                listItems={items} /> : <div></div>}

            </CardActions>
            <CardText expandable={true}>
              {this.props.announcement.description}
              <br /> <br />
              <h5>Deadline: </h5>{announcement.deadline ? announcement.deadline : " not known"}
            </CardText>
          </Card>)
    }
}