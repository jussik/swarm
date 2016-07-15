/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider, connect} from "react-redux";

import EditorDrawer from "./drawer";
import EditorPanel from "./panel";
import EditorHeader from "./header";
import Node from "../common/node";
import store from "../store";

import {NewNode, Node as NodeData, addNode} from "../store/nodes";
import {reset} from "../store/editor";

interface INodeProps {
    node: NodeData;
}

class NodeView extends React.Component<INodeProps, {}> {
    render() {
        var n = this.props.node;
        return <div>{n.id}: {n.x}, {n.y}</div>;
    }
}
type ActionProp<T> = (...payloads: T[])=>ReduxActions.Action<T>;
interface IStateInfoStateProps {
    nodes: NodeData[];
}
interface IStateInfoDispatchProps {
    onAddNode: ActionProp<NewNode>;
    onReset: ActionProp<any>;
}
class StoreInfo extends React.Component<IStateInfoStateProps & IStateInfoDispatchProps, {}> {
    render() {
        const onAddNode = this.props.onAddNode.bind(this, {x:4,y:99});
        const onReset = this.props.onReset.bind(this);
        return (
            <div>
                Nodes:
                { this.props.nodes.map(n => <NodeView key={n.id} node={n} />) }
                <div><a onClick={onAddNode} style={{cursor:"pointer"}}>Add</a></div>
                <div><a onClick={onReset} style={{cursor:"pointer"}}>Reset</a></div>
            </div>
        );
    }
}
const StoreInfoRedux = connect<IStateInfoStateProps,IStateInfoDispatchProps,any>(state => ({
    nodes: state.nodes
}), dispatch => ({
    onAddNode: node => dispatch(addNode(node)),
    onReset: () => dispatch(reset())
}))(StoreInfo);

export default class Editor extends React.Component<{}, { nodes: Node[] }> {
    constructor() {
        super();
        this.state = { nodes: [] };
    }

    componentDidMount() {
        var s0 = new Node();
        s0.name = "On Begin";
        s0.pos = { x: 50, y: 20 };
        var trig0 = s0.addOutput("", true);

        var s1 = new Node();
        s1.name = "Nearest Contact";
        s1.pos = { x: 250, y: 80 };
        var in1 = s1.addInput("Input Trigger", true);
        s1.addInput("Input Value", false);
        var trig1 = s1.addOutput("Output Trigger", true);
        var out1 = s1.addOutput("Contact", false);

        var s2 = new Node();
        s2.name = "Move To";
        s2.pos = { x: 700, y: 40 };
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

//ReactDOM.render(<Provider store={store}>
//    <Editor/>
//</Provider>, document.getElementById("main"));
ReactDOM.render(<Provider store={store}>
    <StoreInfoRedux/>
</Provider>, document.getElementById("main"));