import { Moment } from "moment";

export interface IInterval {
    start: Moment;
    end: Moment;
    description?: string;
}
