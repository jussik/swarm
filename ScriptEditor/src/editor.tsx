/// <reference path="../typings/browser.d.ts"/>
import * as React from "react";

import "./editor.less";

interface IEditorProps { }
interface IEditorState { }

export default class Editor extends React.Component<IEditorProps, IEditorState> {
    render() {
        return <h3>Editor</h3>;
    }
}
