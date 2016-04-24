/// <reference path="../../typings/browser.d.ts"/>
import {Point, identity, watchable, watch, IWatchable} from "./common";

export class NodeLink {
    @identity id: number;
    src: NodePort;
    dest: NodePort;

    constructor(port1: NodePort, port2: NodePort) {
        if ((port1.flags & PortFlags.Input) > 0) {
            this.src = port2;
            this.dest = port1;
        } else {
            this.src = port1;
            this.dest = port2;
        }
    }
}

export enum PortFlags {
    Input = 1,
    Output = 2,
    Trigger = 4,
    Value = 8
}
export interface NodePort extends IWatchable { }
@watchable
export class NodePort {
    @identity id: number;
    name: string;
    node: ScriptNode;
    flags: PortFlags;
    links: NodeLink[];
    @watch pos: Point;

    constructor() {
        this.links = [];
    }
    connect(port: NodePort): NodeLink {
        var isInput = (this.flags & PortFlags.Input) > 0;
        var link = new NodeLink(this, port);
        this.links.push(link);
        port.links.push(link);
        return link;
    }
}

export interface ScriptNode extends IWatchable { }
@watchable
export class ScriptNode {
    @identity id: number;
    name: string;
    inputs: NodePort[];
    outputs: NodePort[];
    @watch pos: Point;

    constructor() {
        this.inputs = [];
        this.outputs = [];
    }
    addInput(name: string, trigger: boolean) {
        var port = this.addPort(name, PortFlags.Input, trigger);
        this.inputs.push(port);
        return port;
    }
    addOutput(name: string, trigger: boolean) {
        var port = this.addPort(name, PortFlags.Output, trigger);
        this.outputs.push(port);
        return port;
    }
    private addPort(name: string, direction: PortFlags, trigger: boolean): NodePort {
        var port = new NodePort();
        port.node = this;
        port.name = name;
        port.flags = direction | (trigger ? PortFlags.Trigger : PortFlags.Value);
        return port;
    }
}