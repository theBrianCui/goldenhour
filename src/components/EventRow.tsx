import * as React from "react";

export interface IEventRowProps {
    name: string;
    start: string;
    end: string;
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
                Start: {props.start}, End: {props.end}
            </div>
            {happeningNowDiv}
        </div>
    )
}
