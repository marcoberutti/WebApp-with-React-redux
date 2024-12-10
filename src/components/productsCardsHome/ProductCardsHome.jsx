import { useSelector, useDispatch } from "react-redux";
import style from './productCardsHome.module.css'
import Button from "../Button";
import { useEffect, useState } from "react";
import { resetQuantities } from "features/productsSlice";
import { addToCart } from "features/cartSlice";
import { increment, decrement } from "features/productsSlice";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { syncWithLocalStorage } from "features/productsSlice";

export default function ProductCardsHome(){
  const dispatch = useDispatch();
  const products = useSelector((state)=> state.products)
  const cart = useSelector((state)=> state.cart)
  const [showAnimation, setShowAnimation] = useState('')

  const handleDecrement = (id) => {
    dispatch(decrement(id))
  }
  const handleIncrement = (id) => {
    dispatch(increment(id))
  }

  useEffect(() => {
    dispatch(syncWithLocalStorage())
  }, [dispatch]);

  useEffect(()=>{
    if(cart.length > 0){
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  },[cart])

  function handleAddToCart(product){
    const productToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: product.quantity
    }
  dispatch(addToCart(productToAdd))
  dispatch(resetQuantities())
  }

  return (
    <>
      {products.length !== 0 ?
        products.map((product) => 
        <div className={style.productCardsHome} key={product.id}>
          <p>{product.stockQuantity} left!!</p>
          {product.image ?
          <img src={product.image} alt=""/>
          :
          <img alt="no data here"/>
          }
          <div className={style.section}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {parseFloat(product.price).toFixed(2)} €</p>
          </div>
          <div className={style.footer}>
            <div>
              <Button
                addRemove={true}
                handleClick={()=>handleDecrement(product.id)}
              >-</Button>
              <span>{product.quantity}</span>
              <Button
                addRemove={true}
                handleClick={()=>handleIncrement(product.id)}
              >+</Button>
            </div>
            <Button
              handleClick={()=> {
                handleAddToCart(product)
                setShowAnimation(product.id)
                setTimeout(()=>{
                  setShowAnimation('')
                },500)
                }}
            >Add to cart
            { showAnimation === product.id && <span className={style.cartContainer}><i className={`bi bi-cart-check ${style.myCart}`}></i></span>}
            </Button>
          </div>
        </div>
      )
      :
      <div>no products yet</div>
      }
    </>
  )
}