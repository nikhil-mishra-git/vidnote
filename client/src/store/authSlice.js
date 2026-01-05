import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: true,
    },
    reducers: {
        setAuth(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        clearAuth(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },

    },
});

export const { setAuth, clearAuth, updateUser } = authSlice.actions;
export default authSlice.reducer;
