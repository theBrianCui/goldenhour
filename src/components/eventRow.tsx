import * as React from "react";
import { IInterval } from "../interfaces";

export interface IEventRowProps extends IInterval {
    name: string;
    happeningNow: boolean;
}

export function EventRow(props: IEventRowProps): JSX.Element {
    const happeningNowDiv: JSX.Element | null = props.happeningNow ?
        (
            <div>HAPPENING NOW</div>
        ) : null;

    return (
        <div>
            <div>
                <strong>
                    {props.name}:
                </strong>
                Start: {props.start.format("h:mm:ss a")}, End: {props.end.format("h:mm:ss a")}
            </div>
            {happeningNowDiv}
        </div>
    )
}