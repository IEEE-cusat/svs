import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from './firebaseConfig';
import logo from './logo.svg';
import './App.css';
import Home from './components/HomeComponent';
import {WEB} from './components/webtools';
import firebaseApp from './firebaseConfig'
//const firebaseApp = firebase.(config);
import code from './code.jpg'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        web: WEB,
        
    };
  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      
      <div className="App" >
      
        <header className="App-header" >
        
        <div className="boxone">
         <div className="boxone1">
         <p>WELCOME TO DEVCHAT!</p>
         </div>
        
          {
            user
              ? <Home  webs={this.state.web} />
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button  onClick={signInWithGoogle} className="btn-success" >Sign in with Google</button>
          }
           </div>
        </header>
      </div>
     
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);