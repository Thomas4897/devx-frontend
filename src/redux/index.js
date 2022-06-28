/* eslint-disable default-param-last */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userState';

const store = configureStore({
  reducer: {
    user: userReducer,

  },
});

export default store;
