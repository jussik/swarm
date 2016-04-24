import Port from "./port";
import {Point, identity, watchable, watch, IWatchable} from "./common";

interface Node extends IWatchable { }
@watchable
class Node {
    @identity id: number;
    name: string;
    inputs: Port[];
    outputs: Port[];
    @watch pos: Point;

    constructor() {
        this.inputs = [];
        this.outputs = [];
    }
    addInput(name: string, trigger: boolean) {
        var port = this.addPort(name, true, trigger);
        this.inputs.push(port);
        return port;
    }
    addOutput(name: string, trigger: boolean) {
        var port = this.addPort(name, false, trigger);
        this.outputs.push(port);
        return port;
    }
    private addPort(name: string, input: boolean, trigger: boolean): Port {
        var port = new Port();
        port.node = this;
        port.name = name;
        port.isInput = input;
        port.isTrigger = trigger;
        return port;
    }
}
export default Node;