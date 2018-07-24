import * as moment from "moment";
import { Moment } from "moment";
import { combineReducers } from "redux";
import { ISunEvents } from "../lib/sunEvents";
import { ActionTypes, IAction } from "./actions";

export interface IState {
    status: string;
    currentTime: Moment;
    updateTime: Moment;
    eventList: ISunEvents | null;
}


function status(newStatus: string = "Determining your location...", action: IAction): string {
    switch (action.type) {
        case ActionTypes.UPDATE_STATUS:
            return action.status;
        default:
            return newStatus;
    }
}

const initialMoment = moment();
function currentTime(newCurrentTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_CURRENT_TIME:
            return action.currentTime;
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.updateTime;
        default:
            return newCurrentTime;
    }
}

function updateTime(newUpdateTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.updateTime;
        default:
            return newUpdateTime;
    }
}

function eventList(newEventList: ISunEvents | null = null, action: IAction): ISunEvents | null {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.eventList;
        default:
            return newEventList;
    }
}

export const Reducers = combineReducers<IState>({
    status,
    currentTime,
    updateTime,
    eventList,
});
