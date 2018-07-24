import * as Promise from "bluebird";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";
import EventList from "./components/EventList";
import Header from "./components/Header";
import getLocation, { IPosition } from "./dom/location";
import { getSunEvents } from "./lib/sunEvents";
import { updateCurrentTime, updateEventList, updateLocation, updateStatus } from "./redux/actions";
import { Reducers } from "./redux/reducers";

export const store = createStore(Reducers);

export default class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header /> 
                    <EventList />
                </div>
            </Provider>
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
        const state = store.getState();
        if (!state.currentLocation) { return; }

        store.dispatch(updateEventList(state.currentTime, getSunEvents(state.currentTime, state.currentLocation)));
    }
}