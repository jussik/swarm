/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";

import EditorDrawer from "./drawer";
import EditorPanel from "./panel";
import EditorHeader from "./header";
import {ScriptNode, PortFlags} from "../common/scriptNode";

export default class Editor extends React.Component<{}, { nodes: ScriptNode[] }> {
    constructor() {
        super();
        this.state = { nodes: [] };
    }

    componentDidMount() {
        var s0 = new ScriptNode();
        s0.name = "On Begin";
        s0.x = 50;
        s0.y = 20;
        var trig0 = s0.addOutput("", true);

        var s1 = new ScriptNode();
        s1.name = "Nearest Contact";
        s1.x = 250;
        s1.y = 80;
        var in1 = s1.addInput("Input Trigger", true);
        s1.addInput("Input Value", false);
        var trig1 = s1.addOutput("Output Trigger", true);
        var out1 = s1.addOutput("Contact", false);

        var s2 = new ScriptNode();
        s2.name = "Move To";
        s2.x = 700;
        s2.y = 40;
        var trig2 = s2.addInput("Input Trigger", true);
        var in2 = s2.addInput("Target", false);

        trig0.connect(in1);
        trig1.connect(trig2);
        out1.connect(in2);

        this.setState({ nodes: [s0, s1, s2] });
    }
    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <EditorHeader/>
                <EditorDrawer/>
                <EditorPanel nodes={this.state.nodes}/>
            </div>
        );
    }
}

ReactDOM.render(<Editor/>, document.getElementById("main"));
