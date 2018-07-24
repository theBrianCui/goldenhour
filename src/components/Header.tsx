import * as React from "react";
import { connect } from "react-redux";
import logo from "../logo.svg";
import { IState } from "../redux/reducers";

export interface IHeaderProps {
    status: string;
}

function Header(props: IHeaderProps): JSX.Element {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">{props.status}</h1>
        </header>
    );
}

function mapStateToProps(state: IState) {
    return {
        status: state.status,
    };
}

export default connect<any, IState>(mapStateToProps)(Header);