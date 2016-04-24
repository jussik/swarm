/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import EditorNode from "./node";
import EditorLink from "./link";
import {ScriptNode, PortFlags} from "../common/scriptNode";

interface IPanelProps {
    nodes: ScriptNode[];
}

export default class EditorPanel extends React.Component<IPanelProps, {}> {
    static childContextTypes = {
        getEditorOffset: React.PropTypes.func.isRequired
    };
    getChildContext() {
        return { getEditorOffset: this.getOffset.bind(this) };
    }
    getOffset() {
        var elem = this.refs["editor"] as HTMLElement;
        if (elem == null)
            throw new Error("Editor not bound");
        var rect = elem.getBoundingClientRect();
        return { x: rect.left, y: rect.top };
    }
    render() {
        var nodes = this.props.nodes;
        return (
            <main className="mdl-layout__content" id="editor" ref="editor">
                <div>
                    {nodes.map(n => <EditorNode key={n.id} node={n} />) }
                    {nodes.map(n => n.outputs.map(p => p.links.map(l => <EditorLink key={l.id} link={l} />))) }
                </div>
            </main>
        );
    }
}
