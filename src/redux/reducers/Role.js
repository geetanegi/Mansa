import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const roleSlice = createSlice({
  name: 'Role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.data = action.payload;
    },

    clearRole: state => {
      state.data = null;
    },
  },
});

export const {setRole, clearRole} = roleSlice.actions;

export default roleSlice.reducer;
