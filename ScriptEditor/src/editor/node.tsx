/// <reference path="../../typings/browser.d.ts"/>
/// <reference path="../d/draggabilly.d.ts"/>

import * as React from "react";
import * as Draggabilly from "draggabilly";


import {ScriptNode, NodePort, PortFlags} from "../common/scriptNode";
import EditorPanel from "./panel";
import EditorPort from "./port";
import "./node.scss";

interface INodeProps {
    node: ScriptNode;
}

export default class EditorNode extends React.Component<INodeProps, {}> {
    componentDidMount() {
        var node = this.refs["node"] as HTMLElement;
        var drag = new Draggabilly(node, {
            handle: ".title",
            containment: "main"
        });
        drag.on("dragMove", (ev, ptr, drag) => this.props.node.pos = { x: node.offsetLeft + drag.x, y: node.offsetTop + drag.y });
        drag.on("dragEnd", () => this.props.node.pos = { x: node.offsetLeft, y: node.offsetTop });
    }
    render() {
        var node = this.props.node;
        var makePort = (p: NodePort) => <EditorPort key={p.id} port={p} />;
        return (
            <div className="editor-node mdl-card mdl-shadow--2dp" style={{left:node.pos.x,top:node.pos.y}} ref="node">
                <div className="title mdl-card__title mdl-card--border">
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
