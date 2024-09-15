import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leftbar: false
}

const leftBarAdminSlice = createSlice({
    name: 'leftbar',
    initialState,
    reducers: {
        setLeftBar: (state, action) => {
        state.leftbar = action.payload
      }
    }
  })
  export const { setLeftBar } = leftBarAdminSlice.actions;
  export default leftBarAdminSlice.reducer;