/* eslint-disable default-param-last */
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    register: (state, action) => action.payload.user,
    logIn: (state, action) => action.payload.user,
    logOut: () => null,
  },
});

export const { logIn, logOut } = userSlice.actions;

export const useUser = () => {
  const dispatch = useDispatch();
  
  return {
    user: useSelector((state) => state.user),
    // register: (userData) => dispatch(logIn(userData)),
    logIn: (userData) => dispatch(logIn(userData)),
    logOut: () => dispatch(logOut()),

  };
};

const userReducer = userSlice.reducer;

export default userReducer;