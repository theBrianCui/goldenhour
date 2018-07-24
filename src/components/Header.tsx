import * as React from "react";
import { connect } from "react-redux";
import logo from "../logo.svg";
import { IState } from "../redux/reducers";

export interface IHeaderProps {
    status: string;
    currentTime: string;
}

function Header(props: IHeaderProps): JSX.Element {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">{props.status}</h1>
            <span>Current Time: {props.currentTime}</span>
        </header>
    );
}

function mapStateToProps(state: IState) {
    return {
        status: state.status,
        currentTime: state.currentTime.format("MM/DD/YYYY h:mm:ss a"),
    };
}

export default connect<any, IState>(mapStateToProps)(Header);