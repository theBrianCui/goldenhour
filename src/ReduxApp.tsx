import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Reducers } from "./redux/reducers";

const store = createStore(Reducers)
export function App() {
    return (
        <Provider store={store}>
        </Provider>
    );
}