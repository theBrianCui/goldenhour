import * as SunCalc from "suncalc";
import { IPosition } from "../dom/location";

export default function getTimes(location: IPosition) {
    return SunCalc.getTimes(new Date(), location.latitude, location.longitude);
}
