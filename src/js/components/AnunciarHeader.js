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
const customContentStyle = {
  maxWidth: '800px',
  width: '100%'
};
@observer
export default class AnunciarHeader extends React.Component {
    constructor(){
        super()
        this.state = {
            open: false,
            signUpopen: false
        }
    }

    signup(){
      var email = document.getElementById('signup_email').value
      var password = document.getElementById('signup_password').value
      var passwordConfirmation = document.getElementById('signup_passwordConfirmation').value
      var username = document.getElementById('signup_username').value
      if(password != passwordConfirmation){
        alert('passwords must match')
      }
      else{
        this.props.anunciarStore.signup(email, username, password, passwordConfirmation)
        this.handlesignUpClose()
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
        this.props.anunciarStore.login(email, password)
        this.handleClose()
    }

    logout(){
        this.props.anunciarStore.logout()
        this.handleClose()
    }
    handleSignUpOpen(){
      this.setState({signUpopen: true})
    }
    handlesignUpClose(){
      this.setState({signUpopen: false})
    }
    render(){
        var loading = this.props.anunciarStore.processing ? <CircularProgress color='#fff' size={30} /> : <div></div>
        var snackBar = this.props.anunciarStore.errors ? <Snackbar
                      open={true}
                      message={this.props.anunciarStore.error + " Error. Please try again"}
                      autoHideDuration={4000}
                    /> : <div></div>
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
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                    >
                      <h3> {user.email} </h3>
                      <h7> {user.role} </h7>
                    </Dialog>
                    {snackBar}
            </div>
        }
        else{
            const signUpactions = [
              <FlatButton
                label="Sign up"
                primary={true}
                keyboardFocused={true}
                disabled={!this.props.anunciarStore.isOnline}
                onTouchTap={this.signup.bind(this)}
                />,
            ]
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
                        <FlatButton
                        label="Sign Up"
                        primary={false}
                        labelStyle={{color:'white'}}
                        style={buttonStyle}
                        onTouchTap={this.handleSignUpOpen.bind(this)}/>
                        </div>}
                  />
                  <Dialog
                      title="Login"
                      actions={actions}
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
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
                    <Dialog
                      title="Sign Up"
                      actions={signUpactions}
                      modal={false}
                      contentStyle={customContentStyle}
                      autoScrollBodyContent={true}
                      open={this.state.signUpopen}
                      onRequestClose={this.handlesignUpClose.bind(this)}
                    >
                      <TextField
                          hintText="example@example.com"
                          floatingLabelText="Email"
                          id='signup_email'
                        /><br />
                      <TextField
                          hintText="shhhh"
                          floatingLabelText="Password"
                          type="password"
                          id='signup_password'
                        /><br />
                      <TextField
                        hintText="password confirmation"
                        floatingLabelText="Again"
                        type='password'
                        id='signup_passwordConfirmation'
                        />
                        <br />
                        <TextField
                          hintText='we will use this in our future builds'
                          floatingLabelText='Username'
                          type='text'
                          id='signup_username'
                        />
                    </Dialog>
                    {snackBar}
            </div>
        }
    }
}
