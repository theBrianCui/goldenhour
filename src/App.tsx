import * as React from 'react';
import './App.css';
import getLocation from './dom/location';
import getUpcomingGoldenHours from "./lib/goldenHour";
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
            .then(getUpcomingGoldenHours)
            .then(goldenHours => {
                let location: string;
                if (goldenHours.morning.isBefore(goldenHours.evening)) {
                    location = `Upcoming Morning: ${goldenHours.morning.format("MMMM Do YYYY, h:mm:ss a")}, Evening: ${goldenHours.evening.format("MMMM Do YYYY, h:mm:ss a")}`;
                } else {
                    location = `Upcoming Evening: ${goldenHours.evening.format("MMMM Do YYYY, h:mm:ss a")}, Next Morning: ${goldenHours.morning.format("MMMM Do YYYY, h:mm:ss a")}`;
                }

                this.setState({
                    location,
                });
            })
            .catch((error: string) => {
                this.setState({
                    location: error,
                });
            });
    }
}

export default App;
