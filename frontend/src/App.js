import React from "react"
import './styles/App.sass';
import { useSelector } from 'react-redux'
import AccountForm from "./components/AccountForm"
import ChatMessages from "./components/ChatMessages"
import MessageForm from "./components/MessageForm"
import Banner from "./components/Banner"
import FireFly from "./components/FireFly"

function App() {

  const token = useSelector(state => state.token)

  if (token === "") {
    return (
      <div className="App">
        <Banner />
        <AccountForm />
        <FireFly />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Banner />
        <ChatMessages />
        <MessageForm />
        <FireFly />
      </div>
  );
  }
}

export default App;
