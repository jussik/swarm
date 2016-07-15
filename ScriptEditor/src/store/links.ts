/// <reference path="../../typings/browser.d.ts"/>
import {createAction, handleActions, Action} from "redux-actions";
import * as assign from "core-js/library/fn/object/assign";

import {REMOVE, Node} from "./nodes";
import {RESET, STATE_LOADED} from "./editor";

export const CONNECT = "links/CONNECT";
export const DISCONNECT = "links/DISCONNECT";
export const RANDOM_LINK = "links/RANDOM_LINK";

export type ILinksState = Link[];

export interface NewLink {
    fromNode: number;
    //fromPort: number;
    toNode: number;
    //toPort: number;
}
export interface Link extends NewLink {
    id: number;
}

export const addLink = createAction<NewLink>(CONNECT);
export const removeLink = createAction<number>(DISCONNECT);
export const addRandomLink = createAction<Node[]>(RANDOM_LINK);

var idCounter = 0;
export default handleActions<Link[], any>({
    [CONNECT]: (state: Link[], action: Action<NewLink>) => [...state, assign({ id: ++idCounter }, action.payload)],
    [DISCONNECT]: (state: Link[], action: Action<number>) => state.filter(l => l.id !== action.payload),
    [REMOVE]: (state: Link[], action: Action<number>) => state.filter(l => l.fromNode !== action.payload && l.toNode !== action.payload),
    [RANDOM_LINK]: (state: Link[], action: Action<Node[]>) => {
        const nodes = action.payload;
        const i1 = (Math.random() * nodes.length) >> 0;
        const i2 = (Math.random() * nodes.length - 1) >> 0;
        const fromNode = nodes[i1].id;
        const toNode = nodes[i2 < i1 ? i2 : i2 + 1].id;
        return [...state, { id: ++idCounter, fromNode, toNode }];
    },
    [RESET]: (): Node[] => {
        idCounter = 0;
        return [];
    },
    [STATE_LOADED]: (state: Link[]) => {
        idCounter = state.reduce((s, n) => Math.max(s, n.id), 0);
        return state;
    }
}, []);