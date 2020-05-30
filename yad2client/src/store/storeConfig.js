import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adReducer from '../reducers/ad';
import authReducer from '../reducers/auth';
import filterReducer from '../reducers/filter';
import advanceFilterReducer from '../reducers/advanceFilter';




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            ads: adReducer,
            auth:authReducer,
            filter:filterReducer,
            advanceFilters:advanceFilterReducer   
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};