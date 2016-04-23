/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import {ScriptNode, NodePort, PortFlags} from "../common/scriptNode";
import EditorPanel from "./panel";
import EditorPort from "./port";
import "./node.scss";

interface INodeProps {
    node: ScriptNode;
}

export default class EditorNode extends React.Component<INodeProps, {}> {
    render() {
        var node = this.props.node;
        var makePort = (p: NodePort) => <EditorPort key={p.id} port={p} />;
        return (
            <div className="editor-node mdl-card mdl-shadow--2dp" style={{left:node.x,top:node.y}}>
                <div className="mdl-card__title mdl-card--border">
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
