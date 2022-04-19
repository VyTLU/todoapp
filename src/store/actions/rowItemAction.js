import { EDIT_ITEM } from '../ActionTypes';

export const editItem = (id) => {
    return{
        type: EDIT_ITEM,
        id
    }
}