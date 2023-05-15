import { combineReducers } from '@reduxjs/toolkit';
import internalDataSlice from './internalDataSlice';
import externalApiDataSlice from './externalApiDataSlice';

const rootReducer = combineReducers({
    internalDataSlice,
    externalApiDataSlice
});

export default rootReducer;
