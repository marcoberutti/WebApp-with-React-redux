import { createSlice } from "@reduxjs/toolkit";

let products = JSON.parse(localStorage.getItem('products2')) || []

export const productsSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload)
    },
    removeProduct: (state, action) => {
      const updatedState = state.filter((product) => product.id !== action.payload)
      localStorage.setItem("products2", JSON.stringify(updatedState));
    },
    editProduct: (state, action) => {
      const updatedState =  state.map(product =>
        product.id === action.payload.id ?
        {...product, ...action.payload}
        : product
      )
        localStorage.setItem("products2", JSON.stringify(updatedState)); // Aggiorna il localStorage
        return updatedState; // Aggiorna lo stato
    },
    decrement: (state, action)=>{
      const updatedProducts = state.map(product =>
        product.id === action.payload && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
        );
      return updatedProducts;
    },
    increment:(state, action)=>{
      const updatedProducts = state.map(product =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      return updatedProducts;
    },
    resetQuantities: (state, action) => {
      const updatedState = state.map((product) => ({ ...product, quantity: 1 }));
      localStorage.setItem("products2", JSON.stringify(updatedState)); // Aggiorna il localStorage
      return updatedState; // Aggiorna lo stato
    }
  }
})

export const {
  addProduct, 
  removeProduct, 
  editProduct,
  decrement,
  increment,
  resetQuantities
} = productsSlice.actions
export default productsSlice.reducer