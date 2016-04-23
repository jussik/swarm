import {Point} from "./common";

// TODO: make decorator mixin
class ImplicitId {
    id = ++ImplicitId.idCounter;
    static idCounter = 0;
}

export class NodeLink extends ImplicitId {
    src: NodePort;
    dest: NodePort;

    constructor(port1: NodePort, port2: NodePort) {
        super();
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
interface EventHandler<T> { (args: T): void }
export class NodePort extends ImplicitId {
    name: string;
    node: ScriptNode;
    flags: PortFlags;
    links: NodeLink[];

    // TODO: make property changed event decorator mixin
    private _pos: Point;
    get pos() {
        return this._pos;
    }
    set pos(val: Point) {
        this._pos = val;
        if (this.watchers != null)
            this.watchers.forEach(h => h(val));
    }
    private watchers: EventHandler<Point>[];
    watch(handler: EventHandler<Point>) {
        if (this.watchers == null)
            this.watchers = [];
        this.watchers.push(handler);
        return () => {
            var ix = this.watchers.indexOf(handler);
            if (ix != -1)
                this.watchers.splice(ix, 1);
        }
    }

    constructor() {
        super();
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

export class ScriptNode extends ImplicitId {
    name: string;
    x: number;
    y: number;
    inputs: NodePort[];
    outputs: NodePort[];

    constructor() {
        super();
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