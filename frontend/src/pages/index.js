import React, { Component } from "react";
import io from "socket.io-client";

import Message from "../components/Message";

var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001/",
      name: "",
      text: "",
      messages: []
    };
    socket = io(this.state.endpoint);

    socket.on("chat message", this.onNewMessage);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onNewMessage = msg => {
    this.setState(state => {
      const messages = state.messages.concat(msg);
      return {
        messages
      };
    });
  };

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleMessageChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit("chat message", {
      name: this.state.name,
      text: this.state.text
    });
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className="justify-center mb-32">
        <form
          className="flex flex-col md:flex-row w-full h-64 md:h-24 container"
          onSubmit={this.handleSubmit}
        >
          <input
            className="bg-transparent w-full md:w-40 h-24 pl-2 text-white"
            type="text"
            placeholder="name"
            onChange={this.handleNameChange}
            value={this.state.name}
            required
          />
          <input
            className="bg-transparent w-full md:w-screen text-white h-full md:h-24 pb-32 md:pb-0 pl-2"
            type="text"
            placeholder="message"
            value={this.state.text}
            onChange={this.handleMessageChange}
          />
          <button
            className="bg-purple-700 text-white p-3 rounded h-16"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="container mx-auto" id="chat">
          {this.state.messages.map(msg => (
            <Message key={msg} message={msg} />
          ))}
        </div>
      </div>
    );
  }
}
export default Header;
