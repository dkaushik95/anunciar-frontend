import { computed, observable } from 'mobx'
import axios from 'axios'

class SessionStore {
    @observable user = JSON.parse(sessionStorage.getItem('user'))
    @observable isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'))
    @observable errors = JSON.parse(sessionStorage.getItem('userErrors'))
    @observable processing = false
    constructor(){
        this.updateInfo()
    }
    @computed get filteredTodos(){
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo))
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
            sessionStorage.setItem('user', userd)
            sessionStorage.setItem('isLoggedIn', true)
            this.updateInfo()
            this.processing = false
        })
        .catch((error) =>{
            //show errors and show the change
            window.error = error
            console.log('ERROR: ' + error)
            this.processing = false
        })
    }
    @computed get userinfo(){
        return this.user
    }

    logout(){
        this.processing = true
        console.log("LOGGING OUT")
        sessionStorage.setItem('user', null)
        sessionStorage.setItem('isLoggedIn', false)
        this.updateInfo()
        this.processing = false
        //remove all the files from sessionStore and change update the changes
    }
    updateInfo(){
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.isLoggedIn = sessionStorage.getItem('isLoggedIn')
        this.errors = JSON.parse(sessionStorage.getItem('userErrors'))
    }
}

var sessionStore = window.store = new SessionStore

export default sessionStore