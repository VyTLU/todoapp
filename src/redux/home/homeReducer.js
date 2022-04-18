import { GET_ITEMS } from "../../common/Constants";

const initialState = {
    items: [],
    usedItems: []
}

export const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ITEMS: 
            return {
                ...state,
                items: [...action.payload],
                usedItems: [...action.payload]
            }
        default: 
            return state;
    }
}