import React from "react"
import { observer } from "mobx-react"
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';

const style = {
    position: 'fixed',
    bottom: 10,
    right: 10
}

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

@observer
export default class AnunciarComponent extends React.Component {
    constructor(){
      super()
      this.state={
        open: false
      }
    }
    addAnnouncement(){
      var title = document.getElementById('title_field').value
      var description = document.getElementById('description_field').value
      var deadline = document.getElementById('deadline_field').value
      var tags = document.getElementById('tags_field').value
      this.props.anunciarStore.addAnnouncement(title, description, deadline, tags)
      this.handleClose()
    }
    showAddDialog(){
      this.setState({
        open: true
      })
    }
    handleClose(){
      this.setState({
        open: false
      })
    }
    render(){
        const actions = [
              <FlatButton
                label="Add"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.addAnnouncement.bind(this)}
              />,
            ];
        return <div>
            <FloatingActionButton
              secondary={true}
              style={style}
              onClick={this.showAddDialog.bind(this)}
              disabled={!this.props.anunciarStore.isOnline} >
              <ContentAdd  />
            </FloatingActionButton>
            <Dialog
              title="Add announcement"
              actions={actions}
              modal={false}
              contentStyle={customContentStyle}
              autoScrollBodyContent={true}
              open={this.state.open}
              onRequestClose={this.handleClose.bind(this)}
              >
                <TextField
                  hintText="This is the title"
                  floatingLabelText="Title"
                  id='title_field'
                  fullWidth={true}
                  /><br />
                <TextField
                  hintText="Add a description of the announcement"
                  floatingLabelText="Description"
                  multiLine={true}
                  rows={3}
                  fullWidth={true}
                  id='description_field'
                  /><br />

                <DatePicker hintText="Deadline" id='deadline_field'/><br />

                <TextField
                  hintText="Eg. Submission, presentation, etc."
                  floatingLabelText="Tags"
                  fullWidth={true}
                  id='tags_field'
                  /><br />
            </Dialog>
          </div>
    }
}