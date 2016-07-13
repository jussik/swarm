/// <reference path="../../typings/browser.d.ts"/>
/// <reference path="../d/draggabilly.d.ts"/>

import * as React from "react";
import * as Draggabilly from "draggabilly";

import Node from "../common/node";
import Port from "../common/port";
import EditorPanel from "./panel";
import EditorPort from "./port";
import "./node.scss";

interface INodeProps {
    node: Node;
}

export default class EditorNode extends React.Component<INodeProps, {}> {
    componentDidMount() {
        var nodeElem = this.refs["node"] as HTMLElement;
        var node = this.props.node;
        var drag = new Draggabilly(nodeElem, {
            handle: ".node-title",
            containment: "main"
        });
        drag.on("dragMove", (ev, ptr, drag) => node.pos = { x: nodeElem.offsetLeft + drag.x, y: nodeElem.offsetTop + drag.y });
        drag.on("dragEnd", () => node.pos = { x: nodeElem.offsetLeft, y: nodeElem.offsetTop });
        //setTimeout(() => node.pos = { x: nodeElem.offsetLeft, y: nodeElem.offsetTop }); // width incorrect without timeout
    }
    render() {
        var node = this.props.node;
        var makePort = (p: Port) => <EditorPort key={p.id} port={p} />;
        return (
            <div className="node mdl-card mdl-shadow--2dp" style={{left:node.pos.x,top:node.pos.y}} ref="node">
                <div className="node-title mdl-card__title mdl-card--border">
                    <h1 className="mdl-card__title-text">{node.name}</h1>
                </div>
                <div className="ports-section">
                    <ul className="ports ports-left mdl-list">{node.inputs.map(makePort)}</ul>
                    <ul className="ports ports-right mdl-list">{node.outputs.map(makePort)}</ul>
                </div>
            </div>
        );
    }
}
