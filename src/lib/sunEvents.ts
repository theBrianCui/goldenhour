import * as moment from "moment";
import { Moment } from "moment";
import * as SunCalc from "suncalc";

import { IPosition } from "../dom/location";
import { IInterval } from "../interfaces";

export interface ITwilight {
    civil: IInterval,
    nautical: IInterval,
    astronomical: IInterval,
}

export interface ISunEvents {
    sunrise: IInterval,
    goldenHourMorning: IInterval,
    solarNoon: IInterval,
    goldenHourEvening: IInterval,
    sunset: IInterval,

    dusk: ITwilight,
    night: IInterval,
    nadir: IInterval,
    dawn: ITwilight,
}

// tslint:disable:object-literal-sort-keys
/**
 * Gets the sun events for a given day.
 * @param date Specifies the day.
 * @param location Specifies the target location.
 */
function getSunEvents(date: Moment, location: IPosition): ISunEvents {
    const times = SunCalc.getTimes(date.toDate(), location.latitude, location.longitude);

    return {
        sunrise: {
            start: moment(times.sunrise),
            end: moment(times.sunriseEnd),
        },
        goldenHourMorning: {
            start: moment(times.goldenHourEnd),
            end: moment(times.goldenHourEnd).add(1, 'h'),
        },
        solarNoon: {
            start: moment(times.solarNoon),
            end: moment(times.solarNoon).add(5, 'm'),
        },
        goldenHourEvening: {
            start: moment(times.goldenHour),
            end: moment(times.goldenHour).add(1, 'h'),
        },
        sunset: {
            start: moment(times.sunsetStart),
            end: moment(times.sunset),
        },
        dusk: {
            civil: {
                start: moment(times.sunset),
                end: moment(times.dusk),
            },
            nautical: {
                start: moment(times.dusk),
                end: moment(times.nauticalDusk)
            },
            astronomical: {
                start: moment(times.nauticalDusk),
                end: moment(times.night),
            }
        },
        night: {
            start: moment(times.night),
            end: moment(times.nightEnd),
        },
        nadir: {
            start: moment(times.nadir),
            end: moment(times.nadir).add(5, 'm'),
        },
        dawn: {
            astronomical: {
                start: moment(times.nightEnd),
                end: moment(times.nauticalDawn),
            },
            nautical: {
                start: moment(times.nauticalDawn),
                end: moment(times.dawn),
            },
            civil: {
                start: moment(times.dawn),
                end: moment(SunCalc.getTimes(
                    date.add(1, 'd').toDate(),
                    location.latitude,
                    location.longitude).sunrise),
            },
        }
    }
}

/**
 * Gets the upcoming morning and evening golden hour times for the current time.
 * If a golden hour is currently ongoing, it will be included in the result.
 * @param location Specifies the target location.
 */
export default function getUpcomingGoldenHours(location: IPosition): IGoldenHours {
    const todayGoldenHours = getGoldenHours(moment(), location);
    const tomorrowGoldenHours = getGoldenHours(moment().add(1, 'd'), location);

    const currentInterval = moment().subtract(1, 'h');
    if (currentInterval.isBefore(todayGoldenHours.morning.start)) {
        return {
            morning: todayGoldenHours.morning,
            evening: todayGoldenHours.evening,
        };
    } else if (currentInterval.isBefore(todayGoldenHours.evening.end)) {
        return {
            morning: tomorrowGoldenHours.morning,
            evening: todayGoldenHours.evening,
        }
    } else {
        return tomorrowGoldenHours;
    }
}
