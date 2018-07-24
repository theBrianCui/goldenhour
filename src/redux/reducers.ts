import * as moment from "moment";
import { Moment } from "moment";
import { combineReducers } from "redux";
import { IPosition } from "../dom/location";
import { ISunEvents } from "../lib/sunEvents";
import { ActionTypes, IAction } from "./actions";

export interface IState {
    status: string;
    currentTime: Moment;
    updateTime: Moment;
    currentLocation: IPosition | null;
    eventList: ISunEvents | null;
}

function status(oldStatus: string = "Determining your location...", action: IAction): string {
    switch (action.type) {
        case ActionTypes.UPDATE_STATUS:
            return action.status;
        default:
            return oldStatus;
    }
}

const initialMoment = moment();
function currentTime(oldCurrentTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_CURRENT_TIME:
            return action.currentTime;
        default:
            return oldCurrentTime;
    }
}

function updateTime(oldUpdateTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.updateTime;
        default:
            return oldUpdateTime;
    }
}

function currentLocation(oldLocation: IPosition | null = null, action: IAction): IPosition | null {
    switch (action.type) {
        case ActionTypes.UPDATE_LOCATION:
            return action.location;
        default:
            return oldLocation;
    }
}

function eventList(oldEventList: ISunEvents | null = null, action: IAction): ISunEvents | null {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.eventList;
        default:
            return oldEventList;
    }
}

export const Reducers = combineReducers<IState>({
    status,
    currentTime,
    updateTime,
    currentLocation,
    eventList,
});
