import { css } from "emotion";
import * as React from "react";
import { connect } from "react-redux";
import logo from "../logo.svg";
import { IState } from "../redux/reducers";

export interface IHeaderProps {
    status: string;
    currentTime: string;
}

function Header(props: IHeaderProps): JSX.Element {
    const headerStyle = css({
        backgroundColor: "#222",
        color: "white",
        paddingTop: "1rem",
        paddingBottom: "1rem",
    });

    const timeStyle = css({
        fontWeight: "bold",
    });

    const locationStyle = css({});

    return (
        <header className={headerStyle}>
            <img src={logo} className="App-logo" alt="logo" />
            <div className={timeStyle}>{props.currentTime}</div>
            <div className={locationStyle}>{props.status}</div>
        </header>
    );
}

function mapStateToProps(state: IState) {
    return {
        status: state.status,
        currentTime: state.currentTime.format("MM/DD/YYYY hh:mm:ss a"),
    };
}

export default connect<any, IState>(mapStateToProps)(Header);