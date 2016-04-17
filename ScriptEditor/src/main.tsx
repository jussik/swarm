/// <reference path="../typings/browser.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";

import "file?name=[name].[ext]!./index.html";
import Editor from "./editor";

ReactDOM.render(<Editor/>, document.getElementById("editor"));
