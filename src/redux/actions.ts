import * as moment from "moment";
import { Moment } from "moment";
import { IPosition } from "../dom/location";
import { ISunEvents } from "../lib/sunEvents";

export enum ActionTypes {
    UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME',
    UPDATE_STATUS = 'UPDATE_STATUS',
    UPDATE_LOCATION = 'UPDATE_LOCATION',
    UPDATE_EVENT_LIST = "UPDATE_EVENT_LIST",
}

export type IAction =
    | IUpdateCurrentTimeAction
    | IUpdateStatusAction 
    | IUpdateLocationAction
    | IUpdateEventListAction;

export interface IUpdateCurrentTimeAction {
    type: ActionTypes.UPDATE_CURRENT_TIME;
    currentTime: Moment;
}

export function updateCurrentTime(): IUpdateCurrentTimeAction {
    return {
        type: ActionTypes.UPDATE_CURRENT_TIME,
        currentTime: moment(),
    };
}

export interface IUpdateStatusAction {
    type: ActionTypes.UPDATE_STATUS;
    status: string;
}

export function updateStatus(status: string): IUpdateStatusAction {
    return {
        type: ActionTypes.UPDATE_STATUS,
        status,
    };
}

export interface IUpdateLocationAction {
    type: ActionTypes.UPDATE_LOCATION;
    location: IPosition | null;
}

export function updateLocation(location: IPosition | null): IUpdateLocationAction {
    return {
        type: ActionTypes.UPDATE_LOCATION,
        location,
    };
}

export interface IUpdateEventListAction {
    type: ActionTypes.UPDATE_EVENT_LIST;
    updateTime: Moment;
    eventList: ISunEvents;
}

export function updateEventList(updateTime: Moment, eventList: ISunEvents): IUpdateEventListAction {
    return {
        type: ActionTypes.UPDATE_EVENT_LIST,
        updateTime,
        eventList,
    };
}
