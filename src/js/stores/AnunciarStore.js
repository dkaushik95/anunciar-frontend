import { action, observable } from 'mobx'
import axios from 'axios'


class AnunciarStore {

    @observable announcements = JSON.parse(localStorage.getItem('announcements'))
    @observable user = JSON.parse(localStorage.getItem('user'))
    @observable isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    @observable errors = false
    @observable error = 0
    @observable announcementRecieved = false
    @observable processing = false
    @observable isOnline = window.navigator.onLine

    constructor(){
        this.updateInfo()
    }

    login(email, password){
        this.processing = true
        axios.post("https://anunciar-backend.herokuapp.com/v1/login", {
            email: email,
            password: password
        })
        .then((response) =>{
            const userd = JSON.stringify(response.data)
            if(JSON.parse(userd).error){
                throw(JSON.parse(userd).error)
            }
            localStorage.setItem('user', userd)
            localStorage.setItem('isLoggedIn', true)
            this.updateInfo()
            this.getAnnouncements()
        })
        .catch((error) =>{
            this.errors = true
            this.error = error.response.status
            this.processing = false
            this.updateInfo()

        })

    }
    signup(email, username, password, passwordConfirmation){
        this.processing = true
        this.errors = false
        axios.post('https://anunciar-backend.herokuapp.com/v1/students', {
            user: {
                email: email,
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            }
        }).then((response) =>{
            this.login(email, password)
            this.errors = false

        }).catch((error) =>{
            this.processing = false
            this.errors = true
            this.error = error.response.status
        })
    }
    addAnnouncement(title, description, deadline, tags){
        this.processing = true
        axios({
          method: 'post',
          url: 'https://anunciar-backend.herokuapp.com/v1/announcements',
          data: {
            title: title,
            description: description,
            deadline: deadline,
            tags: tags
          },
          headers: {
            'Authorization': this.user.access_token
          }
        }).then((response) =>{
            this.getAnnouncements()
        }).catch((error) =>{
            this.errors = true
            this.error = error.response.status
        })
    }
    getAnnouncements(){
        axios.get('https://anunciar-backend.herokuapp.com/v1/announcements', {
            headers: {
              'Authorization': this.user.access_token
            }
          })
          .then((response) => {
            localStorage.setItem('announcements', JSON.stringify(response.data))
            this.updateInfo() // doesnt work here, and so I get an error here.
            this.errors = false
            this.processing = false
          })
          .catch((error) => {
            this.errors = true
            this.error = error.response.status
            localStorage.setItem('announcementError', error.data)
            this.processing = false
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
        localStorage.setItem('user', null)
        localStorage.setItem('isLoggedIn', false)
        localStorage.setItem('announcements', null)
        this.updateInfo()
        this.errors = false
        this.processing = false
    }


}

var anunciarStore =  new AnunciarStore

export default anunciarStore