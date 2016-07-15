/// <reference path="../../typings/browser.d.ts"/>
import {createAction, handleActions, Action} from "redux-actions";
import * as assign from "core-js/library/fn/object/assign";

import {RESET, STATE_LOADED} from "./editor";

export interface NewNode {
    x: number;
    y: number;
}
export interface Node extends NewNode {
    id: number;
}

export const ADD = "nodes/ADD";
export const REMOVE = "nodes/REMOVE";

export const addNode = createAction<NewNode>(ADD);
export const removeNode = createAction<number>(REMOVE);

var idCounter = 0;
export default handleActions<Node[], any>({
    [ADD]: (state: Node[], action: Action<NewNode>) => [...state, assign({ id: ++idCounter }, action.payload)],
    [REMOVE]: (state: Node[], action: Action<number>) => state.filter(n => n.id !== action.payload),
    [RESET]: (): Node[] => {
        idCounter = 0;
        return [];
    },
    [STATE_LOADED]: (state: Node[]) => {
        idCounter = state.reduce((s, n) => Math.max(s, n.id), 0);
        return state;
    }
}, []);