import { createSlice } from "@reduxjs/toolkit";

const products = JSON.parse(localStorage.getItem('products2')) || []

export const quantitySlice = createSlice({
  name: 'quantity',
  initialState: products,
  reducers: {
    updateQuantity: (state, action) =>{
      const updatedQuantityState = state.map(product => {
        const matchingPayload = action.payload.find((p) => p.id === product.id)
        return matchingPayload
        ? {
          ...product, stockQuantity: parseInt(product.stockQuantity) - parseInt(matchingPayload.quantity)
        } : product
      }
      )
        localStorage.setItem('products2', JSON.stringify(updatedQuantityState))
        return updatedQuantityState
    },
  }
})

export const { updateQuantity } = quantitySlice.actions
export default quantitySlice.reducer