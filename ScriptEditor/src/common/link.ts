import {identity} from "./common";
import Port from "./port";

export default class Link {
    @identity id: number;
    src: Port;
    dest: Port;

    constructor(port1: Port, port2: Port) {
        if (port1.isInput) {
            this.src = port2;
            this.dest = port1;
        } else {
            this.src = port1;
            this.dest = port2;
        }
    }
}