import { DELETE_ITEM } from '../ActionTypes';

export const deleteItem = (id) => {
    return{
        type: DELETE_ITEM,
        id
    }
}