/// <reference path="../../typings/browser.d.ts"/>
import {createStore, combineReducers} from "redux";
import {default as nodes, INodesState} from "./nodes";
import {default as links, ILinksState} from "./links";
import {stateLoaded, reset} from "./editor";

export type IStoreState = { nodes: INodesState, links: ILinksState };

var prevState = localStorage.getItem("state");
const store = createStore(combineReducers({ nodes, links }), prevState ? JSON.parse(prevState) : {});
if (prevState)
    store.dispatch(stateLoaded());

export default store;

window.onbeforeunload = () => localStorage.setItem("state", JSON.stringify(store.getState()));
