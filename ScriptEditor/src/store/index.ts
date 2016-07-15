/// <reference path="../../typings/browser.d.ts"/>
import {createStore, combineReducers} from "redux";
import nodes from "./nodes";
import links from "./links";
import {stateLoaded, reset} from "./editor";

var prevState = localStorage.getItem("state");
const store = createStore(combineReducers({ nodes, links }), prevState ? JSON.parse(prevState) : {});
if (prevState)
    store.dispatch(stateLoaded());

export default store;

window.onbeforeunload = () => localStorage.setItem("state", JSON.stringify(store.getState()));
