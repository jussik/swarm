/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import {Point} from "../common/common";
import {NodeLink} from "../common/scriptNode";

interface ILinkProps {
    link: NodeLink;
}
interface ILinkState {
    src?: Point;
    dest?: Point;
}

export default class EditorLink extends React.Component<ILinkProps, ILinkState> {
    constructor(props: ILinkProps, context: ILinkState) {
        super(props, context);
        this.state = {};
    }

    private watchers: (() => void)[];
    componentDidMount() {
        this.watchers = [
            this.props.link.src.watch(pos => this.setState({ src: pos })),
            this.props.link.dest.watch(pos => this.setState({ dest: pos }))
        ];
        this.setState({
            src: this.props.link.src.pos,
            dest: this.props.link.dest.pos,
        });
    }
    componentWillUnmount() {
        this.watchers.forEach(fn => fn());
    }
    render() {
        var src = this.state.src;
        var dest = this.state.dest;
        if (src == null || dest == null)
            return null;

        var x1 = src.x;
        var y1 = src.y;
        var x2 = dest.x;
        var y2 = dest.y;

        var left = x1, top = y1;
        var p = 3;

        var width = x2 - x1;
        if (width >= 0) {
            x1 = p;
            x2 = width + p;
        } else {
            width = -width;
            left = x2;
            x1 = width + p;
            x2 = p;
        }

        var height = y2 - y1;
        if (height >= 0) {
            y1 = p;
            y2 = height + p;
        } else {
            height = -height;
            top = y2;
            y1 = height + p;
            y2 = p;
        }

        var h = Math.max(width / 2, 80);
        return (
            <svg width={width + 2 * p} height={height + 2 * p} className="editor-link" style={{ left: left - p, top: top - p }}>
                <path d={`M${x1} ${y1} C${x1 + h} ${y1}, ${x2 - h} ${y2}, ${x2} ${y2}`}
                    stroke="rgba(0,0,0,.5)" strokeWidth="3" strokeLinecap="round" fill="transparent"/>
            </svg>
        );
    }
}
