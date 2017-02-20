import React, { Component } from 'react';
import {render} from 'react-dom';
import Header from './components/Header.jsx';
import SideBar from './components/SideBar.jsx';
import MainSection from './components/MainSection.jsx';

class App extends Component {

    constructor(){
        super();
        var loggedinstate = JSON.parse(JSON.parse(sessionStorage.getItem('isLoggedIn')));
        var userd = JSON.parse(JSON.parse(sessionStorage.getItem('user')));
        var announcementsd = JSON.parse(JSON.parse(localStorage.getItem('announcements')));
        this.state = {
            isLoggedIn: loggedinstate,
            user: userd,
            announcements: announcementsd
        };
        this.getAnnouncement = this.getAnnouncement.bind(this);
    }


    getAnnouncement(){

    }
    render () {
        return (
            <div>
                <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
                <SideBar isLoggedIn={this.state.isLoggedIn} announcements={this.state.announcements} />
                <MainSection isLoggedIn={this.state.isLoggedIn} announcements={this.state.announcements} />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));