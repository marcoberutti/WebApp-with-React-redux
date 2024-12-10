import { createSlice } from "@reduxjs/toolkit";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || null

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {cart, purchasedItems},
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity; // Aggiungi quantità
      } else {
        state.cart.push(product); // Nuovo prodotto
      }
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
      const oldItems = JSON.parse(localStorage.getItem('purchasedItems')) || []
      const allItems = [...oldItems, ...action.payload]
      const allItemsMinusImages = allItems.map(product => {
        const { image, ...productWithoutImage } = product
        return productWithoutImage
      })
      localStorage.setItem('purchasedItems', JSON.stringify(allItemsMinusImages))
      localStorage.setItem('cart', JSON.stringify([]))

      let localStorageCartClearing = JSON.parse(localStorage.getItem('cart'))

      state.cart = localStorageCartClearing
      state.purchasedItems = allItems;
    },
    SyncCartWithLocalStorage: (state) => {
      const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
      state.cart = localStorageCart;
    },
  }
})

export const {addToCart, removeFromCart, increment, decrement, pay, SyncCartWithLocalStorage} = cartSlice.actions
export default cartSlice.reducer