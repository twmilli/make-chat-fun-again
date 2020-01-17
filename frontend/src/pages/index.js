import React, { Component } from "react";
import io from "socket.io-client";

import Message from "../components/Message";
import Modal from "../components/Modal";

var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001/",
      name: "",
      text: "",
      messages: [],
      current_question: null,
      showModal: false
    };
    socket = io(this.state.endpoint);

    socket.on("chat message", this.onNewMessage);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
    /**this.setState({
      text: ""
    });*/
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className="mb-32">
        <div>
          <form
            className="flex flex-col md:flex-row w-full h-64 md:h-24 container border-white border-solid border-b-2"
            onSubmit={this.handleSubmit}
          >
            <input
              className="bg-transparent w-full md:w-40 h-24 pl-2 text-white border-white border-solid border-r-2"
              type="text"
              placeholder="name"
              onChange={this.handleNameChange}
              value={this.state.name}
              required
            />
            <input
              className="bg-transparent w-full md:w-screen text-white h-full md:h-24 pb-32 md:pb-0 pl-10"
              type="text"
              placeholder="message"
              value={this.state.text}
              onChange={this.handleMessageChange}
              required
            />
            <button
              className="bg-purple-700 text-white mt-6 rounded h-16 px-8"
              type="submit"
            >
              Send
            </button>
          </form>
          <div
            className="container mx-auto overflow-auto h-auto mh-vh-60 mb-64"
            id="chat"
          >
            {this.state.messages.map(msg => (
              <Message key={msg} {...msg} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 w-full justify-center flex">
          <Modal show={this.state.showModal} handleClose={this.hideModal}>
            <p>Modal</p>
            <p>Data</p>
          </Modal>
          {this.state.current_question ? (
            <div>{this.state.current_question}</div>
          ) : (
            <button className="bg-purple-700 text-white mt-6 rounded h-16 px-8 w-9/12">
              Generate a new question
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Header;
