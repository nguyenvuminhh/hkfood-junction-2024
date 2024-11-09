import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'selectedNotification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const changeNotification = (notification) => async (dispatch) => {
  dispatch(setNotification(notification));
};