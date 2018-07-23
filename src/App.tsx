import * as React from 'react';
import './App.css';

import getLocation, { IPosition } from './dom/location';
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
    getLocation().then((position: IPosition) => {
      this.setState({
        location: `LAT ${position.latitude} LONG ${position.longitude}`,
      });
    }).catch((error: string) => {
      this.setState({
        location: error,
      });
    });
  }
}

export default App;
