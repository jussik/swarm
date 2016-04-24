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
        var link = this.props.link;
        this.watchers = [
            link.src.watch("pos", pos => this.setState({ src: pos })),
            link.dest.watch("pos", pos => this.setState({ dest: pos }))
        ];
        this.setState({
            src: link.src.pos,
            dest: link.dest.pos,
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

        var dx = dest.x - src.x;
        var h = dx > 0
            ? Math.max(dx / 2, 80)
            : 80
        var c = [
            src,
            { x: src.x + h, y: src.y },
            { x: dest.x - h, y: dest.y },
            dest
        ];
        var min = {
            x: Math.min(src.x, c[2].x),
            y: Math.min(src.y, dest.y),
        };
        var max = {
            x: Math.max(c[1].x, dest.x),
            y: Math.max(src.y, dest.y)
        }
        var o = 5;
        var s = c.map(p => `${p.x - min.x + o} ${p.y - min.y + o}`);
        return (
            <svg width={max.x - min.x + 2 * o} height={max.y - min.y + 2 * o} className="editor-link" style={{ left: min.x - o, top: min.y - o }}>
                <path d={`M${s[0]} C${s[1]}, ${s[2]}, ${s[3]}`}
                    stroke="rgba(0,0,0,.5)" strokeWidth="3" strokeLinecap="flat" fill="transparent"/>
            </svg>
        );
    }
}
