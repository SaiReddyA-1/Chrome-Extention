import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocklist: [],
      newUrl: ''
    };
  }

  componentDidMount() {
    // Fetch blocklist from Chrome storage
    chrome.storage.sync.get(['blocklist'], (result) => {
      if (result.blocklist) {
        this.setState({ blocklist: result.blocklist });
      }
    });
  }

  addUrlToBlocklist = () => {
    const { blocklist, newUrl } = this.state;
    if (newUrl && !blocklist.includes(newUrl)) {
      const updatedBlocklist = [...blocklist, newUrl];
      this.setState({ blocklist: updatedBlocklist, newUrl: '' });
      chrome.storage.sync.set({ blocklist: updatedBlocklist });
    }
  }

  removeUrlFromBlocklist = (url) => {
    const updatedBlocklist = this.state.blocklist.filter(item => item !== url);
    this.setState({ blocklist: updatedBlocklist });
    chrome.storage.sync.set({ blocklist: updatedBlocklist });
  }

  handleInputChange = (event) => {
    this.setState({ newUrl: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Website Blocker</h1>
        <input 
          type="text" 
          value={this.state.newUrl} 
          onChange={this.handleInputChange} 
          placeholder="Enter URL to block"
        />
        <button onClick={this.addUrlToBlocklist}>Add</button>
        <ul>
          {this.state.blocklist.map((url, index) => (
            <li key={index}>
              {url} <button onClick={() => this.removeUrlFromBlocklist(url)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
