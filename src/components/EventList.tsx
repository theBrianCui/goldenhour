import * as React from "react";
import { ISunEvents, EventOrder, DuskSymbol, DawnSymbol, CivilTwilightSymbol, IInterval, NauticalTwilightSymbol, AstronomicalTwilightSymbol } from "../lib/sunEvents";
import { IState } from "../redux/reducers";
import { connect } from "react-redux";
import { EventRow } from "./EventRow";
import { Moment } from "moment";

interface IEventListProps {
    currentTime: Moment;
    eventList: ISunEvents;
}

function eventKey(symbol: Symbol, moment: Moment): string {
    return symbol.toString() + moment.format("DDDDYYYY");
}

function EventList(props: IEventListProps): JSX.Element {
    let eventNodes: JSX.Element[] = [];
    for (const eventSymbol of EventOrder) {
        const event = props.eventList[eventSymbol];
        if (!event) continue;

        eventNodes.push(
            <EventRow
                key={eventKey(eventSymbol, props.currentTime)}
                name={eventSymbol.toString()}
                start={event.start.format("h:mm:ss a")}
                end={event.end.format("h:mm:ss a")}
                happeningNow={props.currentTime.isBetween(event.start, event.end)}
            ></EventRow>
        );

        if (eventSymbol === DuskSymbol || eventSymbol === DawnSymbol) {
            let twilightNodes: JSX.Element[] = [];
            const civilTwilight: IInterval = event[CivilTwilightSymbol];
            const nauticalTwilight: IInterval = event[NauticalTwilightSymbol];
            const astronomicalTwilight: IInterval = event[AstronomicalTwilightSymbol];

            twilightNodes.push(
                <EventRow
                    key={eventKey(CivilTwilightSymbol, props.currentTime)}
                    name={CivilTwilightSymbol.toString()}
                    start={civilTwilight.start.format("h:mm:ss a")}
                    end={civilTwilight.end.format("h:mm:ss a")}
                    happeningNow={props.currentTime.isBetween(civilTwilight.start, civilTwilight.end)}
                ></EventRow>
            );

            twilightNodes.push(
                <EventRow
                    key={eventKey(NauticalTwilightSymbol, props.currentTime)}
                    name={NauticalTwilightSymbol.toString()}
                    start={nauticalTwilight.start.format("h:mm:ss a")}
                    end={nauticalTwilight.end.format("h:mm:ss a")}
                    happeningNow={props.currentTime.isBetween(nauticalTwilight.start, nauticalTwilight.end)}
                ></EventRow>
            );

            twilightNodes.push(
                <EventRow
                    key={eventKey(AstronomicalTwilightSymbol, props.currentTime)}
                    name={AstronomicalTwilightSymbol.toString()}
                    start={astronomicalTwilight.start.format("h:mm:ss a")}
                    end={astronomicalTwilight.end.format("h:mm:ss a")}
                    happeningNow={props.currentTime.isBetween(astronomicalTwilight.start, astronomicalTwilight.end)}
                ></EventRow>
            );

            if (eventSymbol === DawnSymbol) {
                twilightNodes = twilightNodes.reverse();
            }

            eventNodes = eventNodes.concat(twilightNodes);
        }
    }

    return (
        <div>
            {eventNodes}
        </div>
    )
}

function connectStateToProps(state: IState) {
    return {
        currentTime: state.currentTime,
        eventList: state.eventList,
    };
}

export default connect<{}, {}, {}, IEventListProps>(connectStateToProps, EventList);