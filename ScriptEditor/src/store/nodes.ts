/// <reference path="../../typings/browser.d.ts"/>
import {createAction, handleActions, Action} from "redux-actions";
import * as assign from "core-js/library/fn/object/assign";

const ADD = "nodes/ADD";
const REMOVE = "nodes/REMOVE";

export interface Node {
    id: number
    x: number,
    y: number
}

export const addNode = createAction<Node>(ADD);
export const removeNode = createAction<number>(REMOVE);

export default handleActions<Node[], any>({
    [ADD]: (state: Node[], action: Action<Node>) => [...state, action.payload],
    [REMOVE]: (state: Node[], action: Action<number>) => state.filter(n => n.id != action.payload)
}, []);