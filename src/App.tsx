import * as moment from "moment";
import * as React from 'react';
import './App.css';

import getLocation from './dom/location';
import getTimes from './lib/goldenHour';
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
    getLocation()
      .then(getTimes)
      .then(times => {
        const goldenHourString = moment(times.goldenHour).format("MMMM Do YYYY, h:mm:ss a")
        this.setState({
          location: `Golden hour is at: ${goldenHourString}`
        })
      })
      .catch((error: string) => {
        this.setState({
          location: error,
        });
    });
  }
}

export default App;
