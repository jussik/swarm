/// <reference path="../../typings/browser.d.ts"/>
import * as React from "react";

import {Point} from "../common/common";
import Link from "../common/link";

interface ILinkProps {
    link: Link;
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
        var handle = dx > 0
            ? Math.max(dx / 2, 80)
            : 80
        var coefs = [
            src,
            { x: src.x + handle, y: src.y },
            { x: dest.x - handle, y: dest.y },
            dest
        ];
        var min = {
            x: Math.min(src.x, coefs[2].x),
            y: Math.min(src.y, dest.y),
        };
        var max = {
            x: Math.max(coefs[1].x, dest.x),
            y: Math.max(src.y, dest.y)
        }
        var margin = 5;
        var str = coefs.map(p => `${p.x - min.x + margin} ${p.y - min.y + margin}`);
        return (
            <svg width={max.x - min.x + 2 * margin} height={max.y - min.y + 2 * margin} className="editor-link" style={{ left: min.x - margin, top: min.y - margin }}>
                <path d={`M${str[0]} C${str[1]}, ${str[2]}, ${str[3]}`}
                    stroke="rgba(0,0,0,.5)" strokeWidth="3" strokeLinecap="flat" fill="transparent"/>
            </svg>
        );
    }
}
