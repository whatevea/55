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
            console.log('we are here inside login dispatch');
            console.log('action is', action);
            console.log('state is', state);
            const newState = action.payload;
            console.log('state after login:', newState);  // Log the state after updating with action.payload
            return newState;
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