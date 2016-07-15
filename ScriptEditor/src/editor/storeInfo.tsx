/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import {NewNode, Node, addNode} from "../store/nodes";
import {addRandomLink, Link} from "../store/links";
import {reset} from "../store/editor";

interface INodeProps {
    node: Node;
}
class NodeView extends React.Component<INodeProps, {}> {
    render() {
        const n = this.props.node;
        return <div>{n.id}: {n.x}, {n.y}</div>;
    }
}

interface ILinkProps {
    link: Link;
}
class LinkView extends React.Component<ILinkProps, {}> {
    render() {
        const l = this.props.link;
        return <div>{l.id}: {l.fromNode} -> {l.toNode}</div>;
    }
}

type ActionProp<T> = (...payloads: T[]) => ReduxActions.Action<T>;
interface IStateInfoStateProps {
    nodes: Node[];
    links: Link[];
}
interface IStateInfoDispatchProps {
    onAddNode: ActionProp<NewNode>;
    onReset: ActionProp<any>;
    onAddLink: ActionProp<Node[]>;
}

const mapStateToProps = (state: IStateInfoStateProps) => ({
    nodes: state.nodes,
    links: state.links
});
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => ({
    onAddNode: (node: NewNode) => dispatch(addNode(node)),
    onReset: () => dispatch(reset()),
    onAddLink: (nodes: Node[]) => dispatch(addRandomLink(nodes))
});

class StoreInfo extends React.Component<IStateInfoStateProps & IStateInfoDispatchProps, {}> {
    render() {
        const onAddNode = this.props.onAddNode.bind(this, { x: 4, y: 99 });
        const onReset = this.props.onReset.bind(this);
        const onAddLink = this.props.onAddLink.bind(this, this.props.nodes);
        return (
            <div>
                Nodes:
                { this.props.nodes.map(n => <NodeView key={n.id} node={n} />) }
                <div><a onClick={onAddNode} style={{ cursor: "pointer" }}>Add</a></div>
                Links:
                { this.props.links.map(l => <LinkView key={l.id} link={l} />) }
                <div><a onClick={onAddLink} style={{ cursor: "pointer" }}>Add Link</a></div>
                <div><a onClick={onReset} style={{ cursor: "pointer" }}>Reset Data</a></div>
            </div>
        );
    }
}

export default connect<IStateInfoStateProps, IStateInfoDispatchProps, any>(mapStateToProps, mapDispatchToProps)(StoreInfo);