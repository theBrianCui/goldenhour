import { expect } from "chai";
import * as moment from "moment";
import { IPosition } from "../dom/location";
import { AstronomicalTwilightSymbol, CivilTwilightSymbol, DawnSymbol, EventOrder, IInterval, ITwilight, NauticalTwilightSymbol, getSunEvents, DuskSymbol } from "./sunEvents";

// tslint:disable:no-unused-expression
describe('lib/sunEvents.ts', () => {
    const now = moment("2018-01-14");
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

    it("correctly orders dawn twilight", () => {
        const sunEvents = getSunEvents(now, location);
        const dawn: ITwilight = sunEvents[DawnSymbol];

        expect(dawn[NauticalTwilightSymbol].start.isSame(
            dawn[AstronomicalTwilightSymbol].end
        )).to.be.true;

        expect(dawn[CivilTwilightSymbol].start.isSame(
            dawn[NauticalTwilightSymbol].end
        )).to.be.true;

        expect(dawn[AstronomicalTwilightSymbol].start.isBefore(
            dawn[CivilTwilightSymbol].end
        )).to.be.true;
    });

    it("correctly orders dusk twilight", () => {
        const sunEvents = getSunEvents(now, location);
        const dusk: ITwilight = sunEvents[DuskSymbol];

        expect(dusk[NauticalTwilightSymbol].start.isSame(
            dusk[CivilTwilightSymbol].end
        )).to.be.true;

        expect(dusk[AstronomicalTwilightSymbol].start.isSame(
            dusk[NauticalTwilightSymbol].end
        )).to.be.true;

        expect(dusk[CivilTwilightSymbol].start.isBefore(
            dusk[AstronomicalTwilightSymbol].end
        )).to.be.true;
    });
});