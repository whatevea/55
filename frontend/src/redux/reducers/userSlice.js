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
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userData = action.payload.userData;
            state.token = action.payload.token;
      
            
      
            // Save the updated state to local storage
            localStorage.setItem('userData', JSON.stringify(action.payload));
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
export const userSelector = (state) => state.User;