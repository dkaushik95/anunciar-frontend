import { autorun, observable } from 'mobx'
import axios from 'axios'


class AnunciarStore {

    //VARIABLES
    @observable announcements = JSON.parse(localStorage.getItem('announcements'))
    @observable user = JSON.parse(localStorage.getItem('user'))
    @observable isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    @observable errors = false
    @observable announcementRecieved = false
    @observable processing = false
    @observable isOnline = window.navigator.onLine


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
            console.log('SUCCESS: ')

            const userd = JSON.stringify(response.data)
            if(JSON.parse(userd).error){
                throw(JSON.parse(userd).error)
            }
            localStorage.setItem('user', userd)
            localStorage.setItem('isLoggedIn', true)
            this.getAnnouncements()
            this.updateInfo()
            this.errors = false

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
            this.updateInfo()
            this.errors = false
            this.processing = false
          })
          .catch(function (error) {
            console.log(error);
            localStorage.setItem('announcementError', error.data)
          });
    }

    updateInfo(){
        this.announcements = JSON.parse(localStorage.getItem('announcements'))
        this.user = JSON.parse(localStorage.getItem('user'))
        this.isLoggedIn = localStorage.getItem('isLoggedIn')
        this.isOnline = window.navigator.onLine
    }

    logout(){
        this.processing = true
        console.log("LOGGING OUT")
        localStorage.setItem('user', null)
        localStorage.setItem('isLoggedIn', false)
        console.log('REMOVING ANNOUNCEMENTS')
        this.announcements = localStorage.setItem('announcements', null)
        this.updateInfo()
        this.errors = false
        this.processing = false
    }
}

var anunciarStore = window.anunciarStore =  new AnunciarStore

export default anunciarStore