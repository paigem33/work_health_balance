import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    permissions: false
  }

  permission_handler = () => {
    let currentComponent = this;
    var permission;
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
      permission = true;
      currentComponent.setState({permissions: permission}, currentComponent.notification_handler);
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          permission = true;
          currentComponent.setState({permissions: permission}, currentComponent.notification_handler);
        }
      });
    }
  }

  notification_handler = () => {
    if(this.state.permissions){
      setInterval(function(){
        var options = {
          body: 'Look 20 feet away for 20 seconds!'
        }
        var notification = new Notification("Give your eyes a break", options);
      }, 20 * 60 * 1000);
    } 
  }

  componentDidMount() {
    this.permission_handler();
  }

  render() {
    return (
      <div className="App">
        <main>
          <h1>Work Health Balance</h1>
          <p>This app helps you follow the <span className="first_section">&#9679; 20 20 20 &#9679;</span> rule for eye health</p>
          <p>Every <span>20</span> minutes, you'll receive a notification from us, when you do, look <span>20</span> feet away for <span>20</span> seconds!</p>
        </main>
      </div>
    );
  };
}

export default App;

