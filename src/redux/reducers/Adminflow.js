import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const adminFlowSlice = createSlice({
  name: 'AdminFlow',
  initialState,
  reducers: {
    setAdminFlow: (state, action) => {
      state.data = action.payload;
    },

    clearAdminFlow: state => {
      state.data = null;
    },
  },
});

export const {setAdminFlow, clearAdminFlow} = adminFlowSlice.actions;

export default adminFlowSlice.reducer;
