/// <reference path="../../typings/browser.d.ts"/>
import {createAction, handleActions, Action} from "redux-actions";
import * as assign from "core-js/library/fn/object/assign";

const ADD = "links/ADD";
const REMOVE = "links/REMOVE";

export interface Link {
    id: number
    fromNode: number,
    toNode: number
}

export const addLink = createAction<Link>(ADD);
export const removeLink = createAction<number>(REMOVE);

export default handleActions<Link[], any>({
    [ADD]: (state: Link[], action: Action<Link>) => [...state, action.payload],
    [REMOVE]: (state: Link[], action: Action<number>) => state.filter(n => n.id != action.payload)
}, []);