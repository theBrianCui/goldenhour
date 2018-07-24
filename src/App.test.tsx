import { expect } from "chai";
import * as moment from "moment";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { IPosition } from "./dom/location";
import { EventOrder, getSunEvents, IInterval} from "./lib/sunEvents";
import { Reducers } from './redux/reducers';
 
jest.mock("./dom/location.ts");

// tslint:disable:no-unused-expression

it('renders without crashing', () => {
    const store = createStore(Reducers);
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('lib/sunEvents', () => {
    const now = moment("2018-01-14").startOf('day').add(12, 'h');
    const tomorrow = moment(now).add(1, 'd');
    const location: IPosition = {
        latitude: 47,
        longitude: -122,
    };

    it('correctly orders events by start time', () => {
        const sunEvents = getSunEvents(now, location);
        const sunEventsTomorrow = getSunEvents(tomorrow, location);
        let previousMoment = null;

        for (const eventSymbol of EventOrder) {
            const interval: IInterval = sunEvents[eventSymbol];
            if (!previousMoment) {
                previousMoment = interval.start;
                continue;
            }

            expect(interval.start.isSameOrAfter(previousMoment)).to.be.true;
            expect(interval.end.isAfter(previousMoment)).to.be.true;
            previousMoment = interval.start;
        }

        for (const eventSymbol of EventOrder) {
            const interval: IInterval = sunEventsTomorrow[eventSymbol];
            expect(previousMoment).not.to.be.null;
            if (!previousMoment) {
                previousMoment = interval.start;
                continue;
            }

            expect(interval.start.isSameOrAfter(previousMoment)).to.be.true;
            expect(interval.end.isAfter(previousMoment)).to.be.true;
            previousMoment = interval.start;
        }
    });
});