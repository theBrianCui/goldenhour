import { css } from "emotion";
import { Moment } from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { AstronomicalTwilightSymbol, CivilTwilightSymbol, DawnSymbol, DuskSymbol, EventOrder, IInterval, ISunEvents, NauticalTwilightSymbol } from "../lib/sunEvents";
import { IState } from "../redux/reducers";
import { EventRow } from "./EventRow";

interface IEventListProps {
    currentTime: Moment;
    eventList: ISunEvents | null;
}

const commonFormatString = "MM DD YY hh:mm:ss a";

function eventKey(symbol: symbol, moment: Moment, subsymbol?: symbol): string {
    return symbol.toString() + moment.local().format("DDDDYYYY") + (subsymbol ? subsymbol.toString() : "");
}

function buildEventRows(currentTime: Moment, eventList: ISunEvents | null): JSX.Element[] {
    if (!eventList) {
        return [];
    }

    let eventNodes: JSX.Element[] = [];
    for (const eventSymbol of EventOrder) {
        const event = eventList[eventSymbol];
        if (!event) { continue; }

        eventNodes.push(
            <EventRow
                key={eventKey(eventSymbol, currentTime)}
                name={eventSymbol.toString()}
                start={event.start.local().format(commonFormatString)}
                end={event.end.local().format(commonFormatString)}
                happeningNow={currentTime.isBetween(event.start, event.end, "second", "[]")}
            />
        );

        if (eventSymbol === DuskSymbol || eventSymbol === DawnSymbol) {
            let twilightNodes: JSX.Element[] = [];
            const civilTwilight: IInterval = event[CivilTwilightSymbol];
            const nauticalTwilight: IInterval = event[NauticalTwilightSymbol];
            const astronomicalTwilight: IInterval = event[AstronomicalTwilightSymbol];

            twilightNodes.push(
                <EventRow
                    key={eventKey(CivilTwilightSymbol, currentTime, eventSymbol)}
                    name={CivilTwilightSymbol.toString()}
                    start={civilTwilight.start.local().format(commonFormatString)}
                    end={civilTwilight.end.local().format(commonFormatString)}
                    happeningNow={currentTime.isBetween(civilTwilight.start, civilTwilight.end, "second", "[]")}
                />
            );

            twilightNodes.push(
                <EventRow
                    key={eventKey(NauticalTwilightSymbol, currentTime, eventSymbol)}
                    name={NauticalTwilightSymbol.toString()}
                    start={nauticalTwilight.start.local().format(commonFormatString)}
                    end={nauticalTwilight.end.local().format(commonFormatString)}
                    happeningNow={currentTime.isBetween(nauticalTwilight.start, nauticalTwilight.end, "second", "[]")}
                />
            );

            twilightNodes.push(
                <EventRow
                    key={eventKey(AstronomicalTwilightSymbol, currentTime, eventSymbol)}
                    name={AstronomicalTwilightSymbol.toString()}
                    start={astronomicalTwilight.start.local().format(commonFormatString)}
                    end={astronomicalTwilight.end.local().format(commonFormatString)}
                    happeningNow={currentTime.isBetween(astronomicalTwilight.start, astronomicalTwilight.end, "second", "[]")}
                />
            );

            if (eventSymbol === DawnSymbol) {
                twilightNodes = twilightNodes.reverse();
            }

            eventNodes = eventNodes.concat(twilightNodes);
        }
    }

    return eventNodes;
}

function EventList(props: IEventListProps): JSX.Element {
    const eventNodes = buildEventRows(props.currentTime, props.eventList);
    const style = css({
        backgroundColor: "#0098e6",
    });

    return (
        <div className={style}>
            {eventNodes}
        </div>
    );
}

function connectStateToProps(state: IState) {
    return {
        currentTime: state.currentTime,
        eventList: state.eventList,
    };
}

export default connect<any, IEventListProps>(connectStateToProps)(EventList);