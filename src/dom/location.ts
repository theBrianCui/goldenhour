import * as Promise from "bluebird";

export interface IPosition {
    latitude: number;
    longitude: number;
}

export default function getLocation(): Promise<IPosition> {
    if (!navigator) {
        return Promise.reject("navigator object is not available.");
    }

    if (!navigator.geolocation) {
        return Promise.reject("Location is not supported by this browser.");
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((success) => {
            resolve({
                latitude: success.coords.latitude,
                longitude: success.coords.longitude,
            });
        }, (error) => {
            reject(`Failed to get current position. Error: ${error.toString()}`);
        });
    });
}
