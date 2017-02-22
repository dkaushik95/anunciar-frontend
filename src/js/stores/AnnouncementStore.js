import { observable } from 'mobx'
import sessionStore from './SessionStore'
import axios from 'axios'


class AnnouncementStore {
    @observable announcements
    @observable processing = false
    getAnnouncements(){
        console.log('GETTING ANNOUNCEMENTS')
        this.processing = true
        axios.get()
    }
    updateInfo(){
        this.announcements = localStorage.getItem('announcements')
    }

    logout(){
        this.announcements = localStorage.setItem('announcements', null)
    }
}

var announcementStore = new AnnouncementStore

export default announcementStore