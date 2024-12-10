import ProductCardsCart from "components/cart/ProductCardsCart"
import CartProducts from "components/cart/CartProducts"
import { useSelector } from "react-redux"
import Button from "components/Button"
import style from './cart.module.css'
import { NavLink } from "react-router"
import ScrollContainer from "react-indiana-drag-scroll"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SyncCartWithLocalStorage } from "features/cartSlice"

export default function Cart(){
  const dispatch = useDispatch();
  const cartProducts = useSelector((state)=> state.cart.cart)

  useEffect(() => {
    dispatch(SyncCartWithLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);
  
  

  return(
    <div className={style.mainContainer}>
      <div className={style.headerPage}>
        <h1>My cart</h1>
        <Button
        disabled={cartProducts.length === 0 && true}
        >
          <NavLink 
            className={style.navLink} 
            to='/payments'
          >Proceed to payment</NavLink>
        </Button>
      </div>
      <div className={style.cartContainer}>
        <div className={style.cartProductsContainer}>
          {cartProducts.length > 0 ?
          <CartProducts/>
          :
          <h2>No products to cart yet</h2>
          }
        </div>
        <ScrollContainer className={style.scrollContainer}>
          <div className={style.otherProducts}>
            <h3>Our other products...</h3>
            <ProductCardsCart/>
          </div>
        </ScrollContainer>
      </div>
    </div>
  )
}