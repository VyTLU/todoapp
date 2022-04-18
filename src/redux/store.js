import { createStore, combineReducers } from 'redux'
import { homeReducer } from './home/homeReducer'

const rootReducer = combineReducers({
    home: homeReducer,
})

const store = createStore(rootReducer);

export default store;