/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

export default class EditorHeader extends React.Component<{}, {}> {
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Title</span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation">
                        <a className="mdl-navigation__link" href="#">Link</a>
                        <a className="mdl-navigation__link" href="#">Link</a>
                        <a className="mdl-navigation__link" href="#">Link</a>
                    </nav>
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                        <i className="material-icons">build</i>
                    </button>
                </div>
            </header>
        );
    }
}
