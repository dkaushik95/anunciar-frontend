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

@observer
export default class AnunciarHeader extends React.Component {
    constructor(){
        super()
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

    login(){
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        this.props.sessionStore.login(email, password)
        this.handleClose()
    }

    logout(){
        this.props.sessionStore.logout()
        this.handleClose()
    }
    render(){
        var loading = this.props.sessionStore.processing ? <CircularProgress color='#fff' size={30} /> : <div></div>
        var snackBar = this.props.sessionStore.errors ? <Snackbar
                      open={true}
                      message='Error Logging you in! Please check your credentials'
                      autoHideDuration={4000}
                    /> : <div></div>
        if(this.props.sessionStore.isLoggedIn == 'true'){
            const actions = [
              <FlatButton
                label="Logout"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.logout.bind(this)}
              />,
            ];
            var { user } = this.props.sessionStore
            var label = user.role + " " + user.email

            return <div>
                <AppBar
                    title={<span>Anunciar</span>}
                    iconElementLeft={<IconButton><Announcement /> </IconButton>}
                    iconElementRight={<div>
                        {loading}
                        <IconButton
                        tooltip={this.props.sessionStore.user.email}
                        tooltipPosition="bottom-left"
                        label={label}
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
                      <h2> {user.role} </h2>
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