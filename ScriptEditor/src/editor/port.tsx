/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import EditorPanel from "./panel";
import {Point} from "../common/common";
import {NodePort, PortFlags} from "../common/scriptNode";

interface IPortProps {
    port: NodePort;
}

export default class EditorPort extends React.Component<IPortProps, {}> {
    context: { getEditorOffset: () => Point };
    static contextTypes = { getEditorOffset: React.PropTypes.func.isRequired };
    unwatch: () => void;
    componentDidMount() {
        this.unwatch = this.props.port.node.watch("pos", this.calculatePos.bind(this));
        this.calculatePos();
    }
    componentWillUnmount() {
        this.unwatch();
    }
    calculatePos() {
        var button = this.refs["button"] as HTMLElement;
        var offset = this.context.getEditorOffset();
        var rect = button.getBoundingClientRect();
        var style = getComputedStyle(button);
        var width = (this.props.port.flags & PortFlags.Input) > 0
            ? -parseInt(style.marginLeft)
            : rect.width + parseInt(style.marginRight);
        this.props.port.pos = {
            x: rect.left - offset.x + width,
            y: rect.top - offset.y + rect.height / 2
        };
    }
    render() {
        var port = this.props.port;
        var isConnected = port.links.length > 0;
        var buttonIcon = (port.flags & PortFlags.Trigger) > 0
            ? "play_circle_" + (isConnected ? "filled" : "outline")
            : "radio_button_" + (isConnected ? "checked" : "unchecked");
        var button = (
            <button ref="button"
                className="port-icon mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">{buttonIcon}</i>
            </button>
        );
        return (port.flags & PortFlags.Input) > 0 ? (
            <li className="port port-left mdl-list__item">
                <span className="mdl-list__item-primary-content">
                    {button}
                    {port.name}
                </span>
            </li>
        ) : (
            <li className="port port-right mdl-list__item">
                <span className="mdl-list__item-primary-content">
                    {port.name}
                </span>
                {button}
            </li>
        );
    }
}
