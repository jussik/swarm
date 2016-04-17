/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

export default class EditorDrawer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Title</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="#">Link</a>
                    <a className="mdl-navigation__link" href="#">Link</a>
                    <a className="mdl-navigation__link" href="#">Link</a>
                    <a className="mdl-navigation__link" href="#">Link</a>
                </nav>
            </div>
        );
    }
}
