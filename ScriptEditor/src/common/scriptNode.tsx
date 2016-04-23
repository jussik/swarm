export default class ScriptNode {
    id: number;

    static keyCounter = 0;
    constructor() {
        this.id = ++ScriptNode.keyCounter;
    }
}
