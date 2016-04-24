import {Point, identity, watchable, watch, IWatchable} from "./common";
import Node from "./node";
import Link from "./link";

interface Port extends IWatchable { }
@watchable
class Port {
    @identity id: number;
    name: string;
    node: Node;
    isInput: boolean;
    isTrigger: boolean;
    links: Link[];
    @watch pos: Point;

    constructor() {
        this.links = [];
    }
    connect(port: Port): Link {
        var link = new Link(this, port);
        this.links.push(link);
        port.links.push(link);
        return link;
    }
}
export default Port;