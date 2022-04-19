import { FETCH_LIST_TODO, FETCH_LIST_TODO_COMPLETED, FETCH_LIST_TODO_FAILED, SHOW_ADD_FORM } from "../ActionTypes";
import { MockAPI } from '../../services'


export const getItems = () => async dispatch => {
    dispatch({type: FETCH_LIST_TODO});
    try {
        const payload = await MockAPI.getListTodo();
        dispatch({
            type: FETCH_LIST_TODO_COMPLETED,
            payload
        })
    } catch (error) {
        dispatch({
            type: FETCH_LIST_TODO_FAILED,
            error
        })
    }
}

export const setShowAdd = () => {
    return{
        type: SHOW_ADD_FORM,
    }
}