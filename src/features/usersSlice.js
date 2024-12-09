import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

let users = JSON.parse(localStorage.getItem('users')) || [];

export const usersSlice = createSlice({
  name: 'users',
  initialState: {users: users, currentToken: null, message: ''},
  reducers: {
    login: (state, action) => {
      const existingUser = state.users.find((user)=>(
        user.username === action.payload.username &&
        user.password === action.payload.password)
      )
      if(existingUser){
        const userToken = nanoid();
        state.currentToken = userToken
        localStorage.setItem('userToken', userToken)
        state.message = 'You are logged in!'
      }
    },
    signin: (state, action) => {
      if(!state.users){
      localStorage.setItem('users', [])
      const existingUser = state.users.find((user)=> (
        user.username === action.payload.username &&
        user.password === action.payload.password)
      )
      if(!existingUser){
          state.users.push(action.payload)
          localStorage.setItem('users', JSON.stringify(state.users.users))
          state.message = 'You are now registered!'
        } else {
          state.message = 'You are already registered!'
        }
      } else {
        const existingUser = state.users.find((user)=> (
          user.username === action.payload.username &&
          user.password === action.payload.password)
        )
        if(!existingUser){
          state.users.push(action.payload)
          localStorage.setItem('users', JSON.stringify(state.users))
          state.message = 'You are now registered!'
        } else {
          state.message = 'You are already registered!'
        }
      }
    },
    logout: (state, action) => {
      state.currentToken = null
      localStorage.removeItem('userToken')
      state.message = 'You are logged out'
    },
    resetMessage: (state) => {
      state.message = '';
    }
  }
})

export const {login, signin, logout, resetMessage} = usersSlice.actions;
export default usersSlice.reducer