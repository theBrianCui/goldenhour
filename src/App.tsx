import * as Promise from "bluebird";
import * as React from "react";
import "./App.css";
import EventList from "./components/EventList";
import Header from "./components/Header";
import getLocation, { IPosition } from "./dom/location";
import { store } from "./index";
import { getSunEvents } from "./lib/sunEvents";
import { updateCurrentTime, updateEventList, updateLocation, updateStatus } from "./redux/actions";

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
        setInterval(() => {
            store.dispatch(updateCurrentTime());
        }, 1000);

        this.updateLocation()
            .then(this.updateSunEvents);
    }

    private updateLocation(): Promise<IPosition | null> {
        return getLocation().then(location => {
            store.dispatch(updateStatus(`LAT: ${location.latitude.toFixed(3)} LONG: ${location.longitude.toFixed(3)}`));
            store.dispatch(updateLocation(location));
            return location;

        }).catch((error: string) => {
            console.error(error);

            /* fail silently if there was a previous location,
               otherwise show an error message */
            const bestKnownLocation = store.getState().currentLocation;
            if (!bestKnownLocation) {
                store.dispatch(updateStatus("Location Services Unavailable :("));
            }

            return bestKnownLocation;
        });
    }

    private updateSunEvents() {
        console.log("Updating sun events...");
        const state = store.getState();
        if (!state.currentLocation) { return; }

        console.log("A location is known...");
        store.dispatch(updateEventList(state.currentTime, getSunEvents(state.currentTime, state.currentLocation)));

        console.log("update complete!");
    }
}