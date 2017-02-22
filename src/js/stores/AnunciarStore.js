import { action, observable } from 'mobx'
import axios from 'axios'


class AnunciarStore {

    // VARIABLES
    @observable announcements = JSON.parse(localStorage.getItem('announcements'))
    @observable user = JSON.parse(localStorage.getItem('user'))
    @observable isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    @observable errors = false
    @observable announcementRecieved = false
    @observable processing = false
    @observable isOnline = window.navigator.onLine

    // The values I defined on top doesnt show up, so I have to call the update function again to get all the data
    // properly.
    constructor(){
        this.updateInfo()
    }

    login(email, password){
        //put a login request, change loading variable and process the response
        this.processing = true
        axios.post("https://anunciar-backend.herokuapp.com/v1/login", {
            email: email,
            password: password
        })
        .then((response) =>{
            //store it in session and change loading variable
            console.log('SUCCESS LOGGING IN: ' + response)
            const userd = JSON.stringify(response.data)
            if(JSON.parse(userd).error){
                throw(JSON.parse(userd).error)
            }
            localStorage.setItem('user', userd)
            localStorage.setItem('isLoggedIn', true)
            // as you are successfully logged in, get the announcements using the key.
            this.getAnnouncements()
        })
        .catch((error) =>{
            //show errors and show the change
            console.log('ERROR: ' + error)
            this.errors = true
            this.updateInfo()

        })

    }
    getAnnouncements(){
        console.log('GETTING ANNOUNCEMENTS')

        axios.get('https://anunciar-backend.herokuapp.com/v1/announcements', {
            headers: {
              'Authorization': JSON.parse(localStorage.getItem('user')).access_token
            }
          })
          .then(function (response) {
            console.log(response);
            localStorage.setItem('announcements', JSON.stringify(response.data))
            // this.updateInfo() doesnt work here, and so I get an error here.
          })
          .catch(function (error) {

            console.log(error);
            localStorage.setItem('announcementError', error.data)
            this.processing = false
          });
            this.updateInfo()
            this.errors = false
            this.processing = false
    }

    updateInfo(){
        this.announcements = JSON.parse(localStorage.getItem('announcements'))
        this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoggedIn = localStorage.getItem('isLoggedIn')
        // This is how I check if my device is online.
        this.isOnline = window.navigator.onLine
    }

    logout(){
        // Delete everything from the localStorage. Yes I have added user info in the localStorage and not the sessionStorage
        // because I need it to stay when the user opens it from the homescreen.
        this.processing = true
        console.log("LOGGING OUT")
        localStorage.setItem('user', null)
        localStorage.setItem('isLoggedIn', false)
        console.log('REMOVING ANNOUNCEMENTS')
        localStorage.setItem('announcements', null)
        this.updateInfo()
        this.errors = false
        this.processing = false
    }
}

var anunciarStore = window.anunciarStore =  new AnunciarStore

export default anunciarStore