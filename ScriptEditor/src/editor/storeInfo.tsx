/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {createSelector} from "reselect";

import {IStoreState} from "../store/index"; // redundant /index required by ReSharper for some reason
import {NewNode, Node, addNode} from "../store/nodes";
import {addRandomLink, removeLink, Link} from "../store/links";
import {reset} from "../store/editor";

interface INodeProps {
    node: Node;
}
interface INodeStateProps {
    links: Link[];
}
class NodeView extends React.Component<INodeProps & INodeStateProps, {}> {
    render() {
        const node = this.props.node;
        return <div>
            {node.id}: {node.x}, {node.y} [{
                this.props.links.map(l => l.id).join(", ")
            }]
        </div>;
    }
}

const nodeLinksSelectorFactory = () => createSelector(
    (state: IStoreState) => state.links,
    (state: IStoreState, props: INodeProps) => props.node.id,
    (links: Link[], nodeId: number) => links.filter((l: Link) => l.fromNode === nodeId || l.toNode === nodeId));
const nodeViewMapStateToProps = () => {
    const nodeLinksSelector = nodeLinksSelectorFactory();
    return (state: IStoreState, props: INodeProps) => ({
        links: nodeLinksSelector(state, props)
    });
};
const NodeViewRedux = connect<INodeStateProps, {}, INodeProps>(nodeViewMapStateToProps)(NodeView);

interface ILinkProps {
    link: Link;
}
interface ILinkDispatchProps {
    onRemoveLink: ActionProp<number>;
}
class LinkView extends React.Component<ILinkDispatchProps & ILinkProps, {}> {
    render() {
        const link = this.props.link;
        const onRemoveLink = this.props.onRemoveLink.bind(this, link.id);
        return <div>
            {link.id}: {link.fromNode} -> {link.toNode}
            <strong onClick={onRemoveLink} style={{ color: "red", cursor: "pointer" }}> &times;</strong>
        </div>;
    }
}

const linkViewMapDispatchToProps = (dispatch: Redux.Dispatch<any>) => ({
    onRemoveLink: (id: number) => dispatch(removeLink(id))
});
const LinkViewRedux = connect<{}, ILinkDispatchProps, ILinkProps>(null, linkViewMapDispatchToProps)(LinkView);

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

const mapStateToProps = (state: IStoreState) => ({
    nodes: state.nodes,
    links: state.links
});
const mapDispatchToProps = (dispatch: Redux.Dispatch<IStoreState>) => ({
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
                { this.props.nodes.map(n => <NodeViewRedux key={n.id} node={n} />) }
                <div><a onClick={onAddNode} style={{ cursor: "pointer" }}>Add</a></div>
                Links:
                { this.props.links.map(l => <LinkViewRedux key={l.id} link={l} />) }
                <div><a onClick={onAddLink} style={{ cursor: "pointer" }}>Add Link</a></div>
                <div><a onClick={onReset} style={{ cursor: "pointer" }}>Reset Data</a></div>
            </div>
        );
    }
}

export default connect<IStateInfoStateProps, IStateInfoDispatchProps, any>(mapStateToProps, mapDispatchToProps)(StoreInfo);