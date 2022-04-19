import { EDIT_ITEM, CANCEL_EDIT } from '../ActionTypes';

const initialState = {
    editing: null,
}

export const listItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case EDIT_ITEM:
            return {
                ...state,
                editing: action.id
            }
        case CANCEL_EDIT:
            return {
                ...state,
                editing: null
            }
        default:
            return state
    }
}