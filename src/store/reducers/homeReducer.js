import { FETCH_LIST_TODO, FETCH_LIST_TODO_COMPLETED, FETCH_LIST_TODO_FAILED, SHOW_ADD_FORM, DELETE_ITEM } from "../ActionTypes";

const initialState = {
    items: [],
    usedItems: [],
    loading: false,
    error: null,
    showAdd: false,
}

export const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LIST_TODO: 
            return {
                ...state,
                loading: true,
            }
        case FETCH_LIST_TODO_COMPLETED: 
            return {
                ...state,
                loading: false,
                items: [...action.payload] || [],
                usedItems: [...action.payload] || []
            }
        case FETCH_LIST_TODO_FAILED: 
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case SHOW_ADD_FORM:
            return {
                ...state,
                showAdd: !state.showAdd,
            }
        case DELETE_ITEM:
            const deletedItems = state.usedItems.filter(item => item.id !== action.id);
            return{
                ...state,
                items: [...deletedItems],
                usedItems: [...deletedItems]
            }
        default: 
            return state;
    }
}