/// <reference path="../../typings/browser.d.ts"/>
import {createAction, handleActions, Action} from "redux-actions";
import * as assign from "core-js/library/fn/object/assign";

import {REMOVE} from "./nodes";
import {RESET, STATE_LOADED} from "./editor";

export const CONNECT = "links/CONNECT";
export const DISCONNECT = "links/DISCONNECT";

export interface NewLink {
    fromNode: number;
    toNode: number;
}
export interface Link extends NewLink {
    id: number;
}

export const addLink = createAction<NewLink>(CONNECT);
export const removeLink = createAction<number>(DISCONNECT);

var idCounter = 0;
export default handleActions<Link[], any>({
    [CONNECT]: (state: Link[], action: Action<NewLink>) => [...state, assign({ id: ++idCounter }, action.payload)],
    [DISCONNECT]: (state: Link[], action: Action<number>) => state.filter(l => l.id !== action.payload),
    [REMOVE]: (state: Link[], action: Action<number>) => state.filter(l => l.fromNode !== action.payload && l.toNode !== action.payload),
    [RESET]: (): Node[] => {
        idCounter = 0;
        return [];
    },
    [STATE_LOADED]: (state: Link[]) => {
        idCounter = state.reduce((s, n) => Math.max(s, n.id), 0);
        return state;
    }
}, []);