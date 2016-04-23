/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";

import EditorDrawer from "./drawer";
import EditorPanel from "./panel";
import EditorHeader from "./header";
import ScriptNode from "../common/scriptNode";

export default class Editor extends React.Component<{}, {}> {
    private nodes: ScriptNode[];
    constructor(props: any, context: any) {
        super(props, context);
        this.nodes = [new ScriptNode()];
    }
    render() {
        return (
            <div id="editor" className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <EditorHeader/>
                <EditorDrawer/>
                <EditorPanel nodes={this.nodes}/>
            </div>
        );
    }
}

ReactDOM.render(<Editor/>, document.getElementById("main"));
