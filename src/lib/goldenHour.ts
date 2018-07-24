import * as moment from "moment";
import { Moment } from "moment";
import * as SunCalc from "suncalc";

import { IPosition } from "../dom/location";
import { IInterval } from "../interfaces";

export interface IGoldenHours {
    morning: IInterval,
    evening: IInterval,
}

// tslint:disable:object-literal-sort-keys
/**
 * Gets the morning and evening golden hour times for a given day.
 * @param date Specifies the current day.
 * @param location Specifies the target location.
 */
function getGoldenHours(date: Moment, location: IPosition): IGoldenHours {
    const times = SunCalc.getTimes(date.toDate(), location.latitude, location.longitude);
    const morningGoldenHour = moment(times.goldenHourEnd);
    const eveningGoldenHour = moment(times.goldenHour);

    return {
        morning: {
            start: morningGoldenHour,
            end: morningGoldenHour.add(1, 'h'),
        },
        evening: {
            start: eveningGoldenHour,
            end: eveningGoldenHour.add(1, 'h'),
        }
    };
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
