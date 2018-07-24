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
                const morning = goldenHours.morning;
                const evening = goldenHours.evening;

                let location: string;
                if (morning.start.isBefore(evening.start)) {
                    location = `Upcoming Morning: ${morning.start.format("MMMM Do YYYY, h:mm:ss a")}, Evening: ${evening.start.format("MMMM Do YYYY, h:mm:ss a")}`;
                } else {
                    location = `Upcoming Evening: ${evening.start.format("MMMM Do YYYY, h:mm:ss a")}, Next Morning: ${morning.start.format("MMMM Do YYYY, h:mm:ss a")}`;
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
