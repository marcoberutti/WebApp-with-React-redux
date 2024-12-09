import { createSlice } from "@reduxjs/toolkit";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || null

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {cart, purchasedItems},
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find((item)=> item.id === action.payload.id)
      if(existingProduct){
        existingProduct.quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
      const oldItems = JSON.parse(localStorage.getItem('cart')) || []
      const newItems = [...oldItems, action.payload]
      localStorage.setItem('cart', JSON.stringify(newItems))
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    increment: (state, action) => {
      const productId = action.payload
      const product = state.cart.find((item)=> item.id === productId)
      if(product){
        product.quantity += 1
      }
    },
    decrement: (state, action) => {
      const productId = action.payload
      const product = state.cart.find((item)=> item.id === productId)
      if(product && product.quantity > 1){
        product.quantity -= 1
      }
    },
    pay: (state, action) => {
      console.log(action.payload)
      const oldItems = JSON.parse(localStorage.getItem('purchasedItems')) || []
      const allItems = [...oldItems, ...action.payload]
      localStorage.setItem('purchasedItems', JSON.stringify(allItems))
      state.cart.filter(product => false)
      localStorage.setItem('cart', JSON.stringify([]))
      return {
        ...state,
        purchasedItems: allItems,
        
      };
    }
  }
})

export const {addToCart, removeFromCart, increment, decrement, pay} = cartSlice.actions
export default cartSlice.reducer