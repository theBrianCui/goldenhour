import * as Promise from "bluebird";
import { IPosition } from "../location";

export default function getLocation(): Promise<IPosition> {
    return Promise.resolve({
        latitude: 47,
        longitude: -122
    });
}
