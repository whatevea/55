import { createSlice } from "@reduxjs/toolkit";
import { loggedInData } from '../../config/authData'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        isLoggedIn: loggedInData()?.isLoggedIn || false,
        userData: loggedInData()?.userData || {},
        token: loggedInData()?.token || ""
    },
    reducers: {
        login: (state, action) => {            
            return action.payload;
        },
        logout: () => {
            return {
                isLoggedIn: false,
                userData: {},
                token: "",
            };
        },
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;