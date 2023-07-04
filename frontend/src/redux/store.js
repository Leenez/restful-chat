import chatReducer from './chatSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
	reducer:chatReducer
})

export default store;