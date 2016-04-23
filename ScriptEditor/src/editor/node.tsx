/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import ScriptNode from "../common/scriptNode";
import "./node.scss";

class INodeProps {
    node: ScriptNode
}

export default class EditorNode extends React.Component<INodeProps, {}> {
    render() {
        return (
            <div className="editor-node mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title mdl-card--border">
                    <h1 className="mdl-card__title-text">Nearest Contact</h1>
                </div>
                <div className="ports ports-left">
                    <span className="port port-left mdl-shadow--2dp">Input Trigger</span>
                    <br/>
                    <span className="port port-left mdl-shadow--2dp">Input Value</span>
                </div>
                <div className="ports ports-right">
                    <span className="port port-right mdl-shadow--2dp">Output Trigger</span>
                    <br/>
                    <span className="port port-right mdl-shadow--2dp">Output Value</span>
                </div>
            </div>
        );
    }
}
