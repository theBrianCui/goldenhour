import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import { EventRow, IEventRowProps } from './components/eventRow';
import getLocation from './dom/location';
import { IInterval } from './interfaces';
import { EventOrder, getSunEvents, ITwilight } from './lib/sunEvents';
import logo from './logo.svg';

interface IAppState {
    status: string;
    eventList: IEventRowProps[];
}

class App extends React.Component<object, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            eventList: [],
            status: "Determining your location...",
        };
    }

    public render() {
        const eventList = this.state.eventList.map((eventProps) => {
            return (
                /* shh, don't tell anyone about this key parameter */
                <EventRow {...eventProps} key={Date.now()}>{event}</EventRow>
            );
        })
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">{this.state.status}</h1>
                </header>
                <p className="App-intro">
                    {eventList}
                </p>
            </div>
        );
    }

    public componentDidMount() {
        const now = moment();
        console.log("Component mounted...");
        getLocation()
            .then(location => {
                console.log("Location acquired!");
                return location;
            })
            .then(location => getSunEvents(now, location))
            .then(sunEvents => {
                let events: IEventRowProps[] = [];

                for (const eventName of EventOrder) {
                    const event: IInterval = sunEvents[eventName];

                    events.push({
                        ...event,
                        happeningNow: now.isBetween(event.start, event.end),
                        name: eventName,
                    });

                    if (eventName !== "dawn" && eventName !== "dusk") {
                        continue;
                    }

                    /* Twilight Events have civil, nautical, and astronomical subevents. */
                    const twilightEvent: ITwilight = event as ITwilight;
                    let twilightEvents: IEventRowProps[] = [];

                    twilightEvents.push({
                        ...event,
                        happeningNow: now.isBetween(twilightEvent.civil.start, twilightEvent.civil.end),
                        name: `${eventName} civil twilight`,
                    });

                    twilightEvents.push({
                        ...event,
                        happeningNow: now.isBetween(twilightEvent.nautical.start, twilightEvent.nautical.end),
                        name: `${eventName} nautical twilight`,
                    });

                    twilightEvents.push({
                        ...event,
                        happeningNow: now.isBetween(twilightEvent.astronomical.start, twilightEvent.astronomical.end),
                        name: `${eventName} astronomical twilight`,
                    });

                    if (eventName === "dawn") {
                        twilightEvents = twilightEvents.reverse();
                    }

                    events = events.concat(twilightEvents);
                }

                this.setState({
                    eventList: events,
                    status: "Events for where you are, now",
                });
            })
            .catch((error: string) => {
                console.log(error);
                this.setState({
                    eventList: [],
                    status: "Something went wrong, try again",
                });
            });
    }
}

export default App;
