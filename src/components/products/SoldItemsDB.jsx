import {useSelector} from 'react-redux'
import { fromUnixTime, format } from 'date-fns'
import style from './soldItems.module.css'
import { useRef, useState } from 'react'

export default function SoldItemsDB(){
  const soldItems = useSelector((state) => state.cart.purchasedItems);
  const inputDateRef = useRef();
  const [dateFrom, setDateFrom] = useState();
  const [totalIncomeFrom, setTotalIncomeFrom] = useState(soldItems)

  function handleChange(){
    const inputDate = new Date(inputDateRef.current.value); // Data locale
    inputDate.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte locale
    
    setDateFrom(inputDate);

    setTotalIncomeFrom(
      soldItems.filter((product) =>
        (fromUnixTime(product.timestamp/1000)) >= inputDate
      )
    )
  }

  return(
    <>
      <div className={style.headerContainer}>
        <h1>Sold items Database:</h1>
        <div>
          <h3>Total income from:</h3>
          <input 
          ref={inputDateRef}
          onChange={handleChange}
          type="date"
          />
        </div>
      </div>
      <div className={style.tableContainer}>
        <table  className={style.SoldItemsDBTable}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Product Image</th>
              <th>Purchased the</th>
            </tr>
          </thead>
          <tbody>
            {totalIncomeFrom.length > 0 ? totalIncomeFrom.map((product, index)=>
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{parseFloat(product.price).toFixed(2)} €</td>
                <td>{product.quantity}</td>
                <td>{(parseFloat(product.price) * parseFloat(product.quantity)).toFixed(2)} €</td>
                <td><img src={product.image} alt="product"/></td>
                <td>{format(fromUnixTime(product.timestamp/1000), 'dd/MM/yyyy p')}</td>
              </tr>
            ) : <tr>No products sold</tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}