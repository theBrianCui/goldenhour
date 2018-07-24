import * as moment from "moment";
import { Moment } from "moment";
import * as SunCalc from "suncalc";

import { IPosition } from "../dom/location";

export const DawnSymbol = Symbol("dawn");
export const SunriseSymbol = Symbol("sunrise");
export const GoldenHourMorningSymbol = Symbol("goldenHourMorning");
export const SolarNoonSymbol = Symbol("solarNoon");
export const GoldenHourEveningSymbol = Symbol("goldenHourEvening");
export const SunsetSymbol = Symbol("sunset");
export const DuskSymbol = Symbol("dusk");

export const CivilTwilightSymbol = Symbol("civilTwilight");
export const NauticalTwilightSymbol = Symbol("nauticalTwilight");
export const AstronomicalTwilightSymbol = Symbol("astronomicalTwilight");

export const NightSymbol = Symbol("night");
export const NadirSymbol = Symbol("nadir");

export interface IInterval {
    start: Moment;
    end: Moment;
}

export interface ITwilight extends IInterval {
    [CivilTwilightSymbol]: IInterval;
    [NauticalTwilightSymbol]: IInterval;
    [AstronomicalTwilightSymbol]: IInterval;
}

export const EventOrder =
    [DawnSymbol, SunriseSymbol, GoldenHourMorningSymbol, SolarNoonSymbol,
     GoldenHourEveningSymbol, SunsetSymbol, DuskSymbol, NightSymbol, NadirSymbol];

export interface ISunEvents {
    [DawnSymbol]: ITwilight;
    [SunriseSymbol]: IInterval;
    [GoldenHourMorningSymbol]: IInterval;
    [SolarNoonSymbol]: IInterval;
    [GoldenHourEveningSymbol]: IInterval;
    [SunsetSymbol]: IInterval;

    [DuskSymbol]: ITwilight;
    [NightSymbol]: IInterval;
    [NadirSymbol]: IInterval;
}

/**
 * Gets the sun events for a given day.
 * @param date Specifies the day.
 * @param location Specifies the target location.
 */
export function getSunEvents(date: Moment, location: IPosition): ISunEvents {
    const times = SunCalc.getTimes(date.toDate(), location.latitude, location.longitude);
    const timesTomorrow = SunCalc.getTimes(moment(date).add(1, 'd').toDate(), location.latitude, location.longitude);

    const nightEnd = moment(times.nightEnd).isAfter(moment(times.night)) ? moment(times.nightEnd) : moment(timesTomorrow.nightEnd);
    const nadirStart = moment(times.nadir).isAfter(moment(times.night)) ? moment(times.nadir) : moment(timesTomorrow.nadir);

    return {
        [DawnSymbol]: {
            start: moment(times.nightEnd),
            end: moment(times.sunrise),

            [AstronomicalTwilightSymbol]: {
                start: moment(times.nightEnd),
                end: moment(times.nauticalDawn),
            },
            [NauticalTwilightSymbol]: {
                start: moment(times.nauticalDawn),
                end: moment(times.dawn),
            },
            [CivilTwilightSymbol]: {
                start: moment(times.dawn),
                end: moment(times.sunrise),
            },
        },
        [SunriseSymbol]: {
            start: moment(times.sunrise),
            end: moment(times.sunriseEnd),
        },
        [GoldenHourMorningSymbol]: {
            start: moment(times.goldenHourEnd),
            end: moment(times.goldenHourEnd).add(1, 'h'),
        },
        [SolarNoonSymbol]: {
            start: moment(times.solarNoon),
            end: moment(times.solarNoon).add(5, 'm'),
        },
        [GoldenHourEveningSymbol]: {
            start: moment(times.goldenHour),
            end: moment(times.goldenHour).add(1, 'h'),
        },
        [SunsetSymbol]: {
            start: moment(times.sunsetStart),
            end: moment(times.sunset),
        },
        [DuskSymbol]: {
            start: moment(times.sunset),
            end: moment(times.night),

            [CivilTwilightSymbol]: {
                start: moment(times.sunset),
                end: moment(times.dusk),
            },
            [NauticalTwilightSymbol]: {
                start: moment(times.dusk),
                end: moment(times.nauticalDusk)
            },
            [AstronomicalTwilightSymbol]: {
                start: moment(times.nauticalDusk),
                end: moment(times.night),
            }
        },
        [NightSymbol]: {
            start: moment(times.night),
            end: nightEnd,
        },
        [NadirSymbol]: {
            start: nadirStart,
            end: moment(nadirStart).add(5, 'm'),
        },
    };
}
