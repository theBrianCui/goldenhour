import * as moment from "moment";
import * as React from "react";
import "./App.css";
import EventList from "./components/EventList";
import Header from "./components/Header";
import getLocation from "./dom/location";
import { store } from "./index";
import { getSunEvents } from "./lib/sunEvents";
import { updateEventList, updateStatus } from "./redux/actions";

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Header /> 
                <EventList />
            </div>
        );
    }

    public componentDidMount() {
        const now = moment();
        getLocation()
            .then(location => {
                store.dispatch(updateStatus(`LAT: ${location.latitude} LONG: ${location.longitude}`));
                return getSunEvents(now, location);
            })
            .then(sunEvents => {
                store.dispatch(updateEventList(now, sunEvents));
            })
            .catch((error: string) => {
                console.error(error);
                store.dispatch(updateStatus("An error occurred: " + error));
            });
    }
}