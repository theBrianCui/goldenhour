import { IAction, ActionTypes } from "./actions";
import * as moment from "moment";
import { Moment } from "moment";
import { combineReducers } from "redux";
import { ISunEvents } from "../lib/sunEvents";

export interface IState {
    status: string;
    currentTime: Moment;
    updateTime: Moment;
    eventList: ISunEvents;
}


function status(status: string = "Determining your location...", action: IAction): string {
    switch (action.type) {
        case ActionTypes.UPDATE_STATUS:
            return action.status;
        default:
            return status;
    }
}

const initialMoment = moment();
function currentTime(currentTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_CURRENT_TIME:
            return action.currentTime;
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.updateTime;
        default:
            return currentTime;
    }
}

function updateTime(updateTime: Moment = initialMoment, action: IAction): Moment {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.updateTime;
        default:
            return updateTime;
    }
}

function eventList(eventList: ISunEvents, action: IAction): ISunEvents {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT_LIST:
            return action.eventList;
        default:
            return eventList;
    }
}

export const Reducers = combineReducers<IState>({
    status,
    currentTime,
    updateTime,
    eventList,
});
