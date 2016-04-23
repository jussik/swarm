/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import EditorNode from "./node";
import ScriptNode from "../common/scriptNode";

class IPanelProps {
    nodes: ScriptNode[];
}

export default class EditorPanel extends React.Component<IPanelProps, {}> {
    render() {
        return (
            <main className="mdl-layout__content">
                <div id="editor">
                    {this.props.nodes.map(n => <EditorNode key={n.id} node={n} />)}
                </div>
            </main>
        );
    }
}
