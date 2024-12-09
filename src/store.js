import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/productsSlice'
import cartReducer from './features/cartSlice'
import usersReducer from './features/usersSlice'
import userInvoiceReducer from './features/userInvoiceSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer,
    users: usersReducer,
    userInvoice: userInvoiceReducer,
  }
})

export default store