import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface IAppState {
  location: string;
}

class App extends React.Component<object, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      location: "Determining your location..."
    };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello, World!</h1>
        </header>
        <p className="App-intro">
          {this.state.location}
        </p>
      </div>
    );
  }

  public componentDidMount() {
    let location = "Location is not supported by this browser";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((success) => {
        console.log("Location received!");
        location = `${success.coords.latitude} LAT ${success.coords.longitude} LONG`;

        this.setState({
          location,
        });
      }, (err) => {
        console.log(`Error: ${err.toString()}`);
      });
    }
  }
}

export default App;
