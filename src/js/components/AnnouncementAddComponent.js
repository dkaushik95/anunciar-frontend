import React from "react"
import { observer } from "mobx-react"
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'




const style = {
    position: 'fixed',
    bottom: 10,
    right: 10
}


@observer
export default class AnunciarComponent extends React.Component {
    constructor(){
      super()
      this.state={
        open: false
      }
    }
    addAnnouncement(){
      //TODO add announcement
      console.log('addAnnouncement')
    }
    showAddDialog(){
      this.setState({
        open: true
      })
      console.log('showAddDialog')
    }
    handleClose(){
      this.setState({
        open: false
      })
      console.log('')
    }
    render(){
        const actions = [
              <FlatButton
                label="Add"
                primary={true}
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
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                        {//Add announcement component, need to move this
                        }
                      <TextField
                          hintText="This is the title"
                          floatingLabelText="Title"
                          id='title'
                        /><br />
                      <TextField
                          hintText="shhhh"
                          floatingLabelText="Password"
                          id='description'
                        /><br />
                    </Dialog>
                </div>
    }
}