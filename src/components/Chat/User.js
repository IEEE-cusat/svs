import React, { Component } from 'react';
//import * as firebase from 'firebase/app';
//import { database } from '../../firebaseConfig';

import Group from './Group';
import Firebase from 'firebase';
//import config from '../../firebaseConfig';
const database = Firebase.database();
export default class User extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      username: '',
      groupname: '' 
    };
  }

  componentWillMount() {
    const userRef = database.ref('users')
      .orderByKey()
      .limitToLast(100);

    userRef.once('value', snapshot => {
      const users = [snapshot.val()];
      this.setState({users: users});
    });
  }

  onNameChange(e) {
    this.setState({username: e.target.value})
  }

  onAddClick(e) {
    e.preventDefault();
    database.ref('users').push({username: this.state.username, groupname: this.props.groupname});
    localStorage.setItem('chat_username', this.state.username);
    window.location = 'http://localhost:3000/group#/chat';
    //this.props.history.push('/chat');
  }

  render() {
    return(
      
    
    <div className="form-group">
         <br></br>
        <label >Username: </label>
        <input className="form-control input-sm" type="text"  onChange={this.onNameChange.bind(this)}/>
        <br></br>
        <button className="btn btn-info" onClick={this.onAddClick.bind(this)}>Submit</button>
    </div>
    );
  }
}