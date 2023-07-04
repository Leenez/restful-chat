import React from "react"
import {AccountForm} from "./components/AccountForm"
import {ChatMessages} from "./components/ChatMessages"
import {MessageForm} from "./components/MessageForm"
import {Banner} from "./components/Banner"

function App() {

  if (state.token === "") {
    return (
      <div className="App">
        <Banner />
        <AccountForm />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Banner />
        <ChatMessages />
        <MessageForm />
      </div>
  );
  }
}

export default App;
