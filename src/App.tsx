import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import getLocation from './dom/location';
import { IInterval } from './interfaces';
import { EventOrder, getSunEvents, ITwilight } from './lib/sunEvents';
import logo from './logo.svg';

interface IAppState {
    events: string[];
}

class App extends React.Component<object, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            events: ["Determining your location..."]
        };
    }

    public render() {
        const eventList = this.state.events.map((event) => {
            return (
                /* shh, don't tell anyone about this key parameter */
                <div key={Date.now()}>{event}</div>
            );
        })
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Hello, World!</h1>
                </header>
                <p className="App-intro">
                    {eventList}
                </p>
            </div>
        );
    }

    public componentDidMount() {
        getLocation()
            .then(location => getSunEvents(moment(), location))
            .then(sunEvents => {
                let eventStrings: string[] = [];

                for (const eventName of EventOrder) {
                    const event: IInterval = sunEvents[eventName];

                    eventStrings.push(`${eventName}: 
                        Start: ${event.start.format("MMMM Do YYYY, h:mm:ss a")}
                        End: ${event.end.format("MMMM Do YYYY, h:mm:ss a")}`);

                    if (eventName !== "dawn" && eventName !== "dusk") {
                        continue;
                    }

                    /* Twilight Events have civil, nautical, and astronomical subevents. */
                    const twilightEvent: ITwilight = event as ITwilight;
                    let twilightStrings: string[] = [];

                    twilightStrings.push(`${eventName} civil twilight: 
                        Start: ${twilightEvent.civil.start.format("MMMM Do YYYY, h:mm:ss a")}
                        End: ${twilightEvent.civil.end.format("MMMM Do YYYY, h:mm:ss a")}`);

                    twilightStrings.push(`${eventName} nautical twilight: 
                        Start: ${twilightEvent.nautical.start.format("MMMM Do YYYY, h:mm:ss a")}
                        End: ${twilightEvent.nautical.end.format("MMMM Do YYYY, h:mm:ss a")}`);

                    twilightStrings.push(`${eventName} astronomical twilight: 
                        Start: ${twilightEvent.astronomical.start.format("MMMM Do YYYY, h:mm:ss a")}
                        End: ${twilightEvent.astronomical.end.format("MMMM Do YYYY, h:mm:ss a")}`);

                    if (eventName === "dawn") {
                        twilightStrings = twilightStrings.reverse();
                    }

                    eventStrings = eventStrings.concat(twilightStrings);
                }

                this.setState({
                    events: eventStrings,
                });
            })
            .catch((error: string) => {
                this.setState({
                    events: [],
                });
            });
    }
}

export default App;
