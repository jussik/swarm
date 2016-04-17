/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";

import EditorDrawer from "./drawer";
import EditorPanel from "./panel";
import EditorHeader from "./header";

export default class Editor extends React.Component<{}, {}> {
    render() {
        return (
            <div id="editor" className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <EditorHeader/>
                <EditorDrawer/>
                <EditorPanel/>
            </div>
        );
    }
}

ReactDOM.render(<Editor/>, document.getElementById("main"));
