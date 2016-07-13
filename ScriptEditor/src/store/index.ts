/// <reference path="../../typings/browser.d.ts"/>
import {createStore, combineReducers} from "redux";
import nodes from "./nodes";
import links from "./links";

const store = createStore(combineReducers({ nodes, links }), {});
export default store;

// TEST:
import {addNode, removeNode} from "./nodes";
import {addLink} from "./links";

store.dispatch(addNode({ id: 0, x: 0, y: 0 }));
store.dispatch(addLink({ id: 0, fromNode: 0, toNode: 1 }));

console.log("1", store.getState());

store.dispatch(removeNode(0));

console.log("2", store.getState());