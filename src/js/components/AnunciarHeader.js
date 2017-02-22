import React from "react"
import { observer } from "mobx-react"
import AppBar from 'material-ui/AppBar'
import Announcement from 'material-ui/svg-icons/action/announcement'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'


const style = {
  margin: 0,
}
const buttonStyle ={
    padding: 6,
}

// observer decoration is used to re-render the components whenever any value on the props is changed from the Store.
@observer
export default class AnunciarHeader extends React.Component {
    constructor(){
        super()
        //open is for the Dialog to show or hide
        this.state = {
            open: false,
        }
    }


    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }
    // call the login function by passing the email and value to the store
    login(){
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        this.props.anunciarStore.login(email, password)
        this.handleClose()
    }

    logout(){
        this.props.anunciarStore.logout()
        this.handleClose()
    }
    render(){
        var loading = this.props.anunciarStore.processing ? <CircularProgress color='#fff' size={30} /> : <div></div>
        var snackBar = this.props.anunciarStore.errors ? <Snackbar
                      open={true}
                      message='Error Logging you in! Please check your credentials'
                      autoHideDuration={4000}
                    /> : <div></div>
        // I dont know how to change the value of online when the device actually goes offline It only knows about that state when the page refreshes.
        if(this.props.anunciarStore.isLoggedIn == 'true'){
            const actions = [
              <FlatButton
                label="Logout"
                primary={true}
                disabled={!this.props.anunciarStore.isOnline}
                keyboardFocused={true}
                onTouchTap={this.logout.bind(this)}
              />,
            ];
            var { user } = this.props.anunciarStore

            return <div>
                <AppBar
                    title={<span>Anunciar</span>}
                    iconElementLeft={<IconButton><Announcement /> </IconButton>}
                    iconElementRight={<div>
                        {loading}
                        <IconButton
                        tooltip={this.props.anunciarStore.user.email}
                        tooltipPosition="bottom-left"
                        style={style}
                        onTouchTap={this.handleOpen.bind(this)}>
                            <AccountCircle color='#fff' />
                        </IconButton></div>}
                  />

                  <Dialog
                      title="Hello!"
                      actions={actions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                      <h1> {user.email} </h1>
                      <h7> {user.role} </h7>
                    </Dialog>
                    {snackBar}
            </div>
        }
        else{
            const actions = [
              <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={true}
                disabled={!this.props.anunciarStore.isOnline}
                onTouchTap={this.login.bind(this)}
              />,
            ];
            return <div>
                <AppBar
                    title={<span>Anunciar</span>}
                    iconElementLeft={<IconButton><Announcement /></IconButton>}
                    iconElementRight={
                        <div>
                        {loading}
                        <FlatButton
                        label="Login"
                        primary={false}
                        labelStyle={{color:'white'}}
                        style={buttonStyle}
                        onTouchTap={this.handleOpen.bind(this)}/>
                        </div>}
                  />
                  <Dialog
                      title="Login"
                      actions={actions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                      <TextField
                          hintText="example@example.com"
                          floatingLabelText="Email"
                          id='email'
                        /><br />
                      <TextField
                          hintText="shhhh"
                          floatingLabelText="Password"
                          type="password"
                          id='password'
                        /><br />
                    </Dialog>
                    {snackBar}
            </div>
        }
    }
}
