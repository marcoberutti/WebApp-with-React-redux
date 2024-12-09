import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import style from './cartProduct.module.css'
import Button from "../Button"
import { removeFromCart, increment, decrement } from "features/cartSlice"

export default function CartProducts(){
  const dispatch = useDispatch()
  const cartProducts = useSelector((state)=> state.cart.cart)

  const handleDecrement = (id) => {
    dispatch(decrement(id))
  }
  const handleIncrement = (id) => {
    dispatch(increment(id))
  }

  function handleRemoveFromCart(id){
    dispatch(removeFromCart(id))
  }

  return(
    <div className={style.cartProductsContainer}>
      {cartProducts.map((product)=>
      <div className={style.cartProductContainer} key={product.id}>
        <div className={style.articleHeader}>
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          {product.image ?
          <img src={product.image} alt=""/>
          :
          <img alt="no data here"/>
          }
        </div>
        <div className={style.priceSection}>
          <p>single amount: {parseFloat(product.price).toFixed(2)} €</p>
          <p>quantity: {parseInt(product.quantity)}</p>
          <p>{(parseFloat(product.price) * parseFloat(product.quantity)).toFixed(2)} €</p>
        </div>
        <div>
          <div className={style.addRemove}>
            <Button
              handleClick={()=>handleDecrement(product.id)}
              addRemove={true}
            >-</Button>
            <span>{parseInt(product.quantity)}</span>
            <Button
              handleClick={()=>handleIncrement(product.id)}
              addRemove={true}
            >+</Button>
          </div>
          <div>
            <Button
              handleClick={()=>handleRemoveFromCart(product.id)}
            >Remove from cart</Button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
} 