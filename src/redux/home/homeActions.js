import { GET_ITEMS } from "../../common/Constants";

export const getItems = (items) => {
    return {
        type: GET_ITEMS,
        payload: items
    }
}