import * as moment from "moment";
import { Moment } from "moment";
import { ISunEvents } from "../lib/sunEvents";

export enum ActionTypes {
    UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME',
    UPDATE_STATUS = 'UPDATE_STATUS',
    UPDATE_EVENT_LIST = "UPDATE_EVENT_LIST",
}

export type IAction =
    | IUpdateCurrentTimeAction
    | IUpdateStatusAction 
    | IUpdateEventListAction;

export interface IUpdateCurrentTimeAction {
    type: ActionTypes.UPDATE_CURRENT_TIME,
    currentTime: Moment;
}

export function updateCurrentTime(): IUpdateCurrentTimeAction {
    return {
        type: ActionTypes.UPDATE_CURRENT_TIME,
        currentTime: moment(),
    };
}

export interface IUpdateStatusAction {
    type: ActionTypes.UPDATE_STATUS,
    status: string;
}

export function updateStatus(status: string): IUpdateStatusAction {
    return {
        type: ActionTypes.UPDATE_STATUS,
        status,
    }
}

export interface IUpdateEventListAction {
    type: ActionTypes.UPDATE_EVENT_LIST,
    updateTime: Moment,
    eventList: ISunEvents,
}

export function updateEventList(updateTime: Moment, eventList: ISunEvents): IUpdateEventListAction {
    return {
        type: ActionTypes.UPDATE_EVENT_LIST,
        updateTime,
        eventList,
    }
}
