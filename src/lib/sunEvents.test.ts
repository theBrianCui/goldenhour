import { expect } from "chai";
import * as moment from "moment";
import { IPosition } from "../dom/location";
import { EventOrder, getSunEvents, IInterval } from "./sunEvents";

// tslint:disable:no-unused-expression
describe('lib/sunEvents.ts', () => {
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