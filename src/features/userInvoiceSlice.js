import { createSlice } from "@reduxjs/toolkit";

let userInvoice = JSON.parse(localStorage.getItem('userForInvoice')) || []

export const productsSlice = createSlice({
  name: 'userInvoice',
  initialState: {userInvoice},
  reducers: {
    remember: (state, action) => {
      state.userInvoice = [...state.userInvoice, action.payload]
      localStorage.setItem('userForInvoice', JSON.stringify(state.userInvoice))
    },
    forget: (state) => {
      state.userInvoice = []
      localStorage.removeItem('userForInvoice')
    },
  }
})

export const {
  remember, 
  forget, 
} = productsSlice.actions
export default productsSlice.reducer