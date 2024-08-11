import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        email: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;