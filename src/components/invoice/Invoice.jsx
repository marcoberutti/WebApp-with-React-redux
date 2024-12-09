import React from 'react'
import { format } from "date-fns";
import { useSelector } from 'react-redux'
import style from './invoice.module.css'
import logo from '../../assets/logo.jpg'

export default function Invoice({name, surname, address, email,printableRef}){
  const cartProducts = useSelector((state) => state.cart.cart) 
  const today = format(new Date(), "dd/MM/yyyy");
  const totalPrice = cartProducts
  .map(product =>product.price * product.quantity)
  .reduce((a,b) => a+b)

  return(
    <div className={style.invoice} ref={printableRef}>
      <h2 className={style.invoiceTitle}>Invoice</h2>
      <header>
        <div>
          <img src={logo} alt=""/>
          <h4>My company LTD</h4>
          <p>21<sup>th</sup> street, Chicago</p>
        </div>
        <div>
          <p><strong>{surname} {name}</strong></p>
          <p>{address}</p>
          <p>Tel: {393801208036}</p>
          <p>{email}</p>
          <hr/>
          <p>Invoice number: localstoraeinvoices.length</p>
          <p>Date: {today}</p>
        </div>
      </header>
      <main>
        <table className={style.productsTable}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Unit price</th>
              <th>Qty</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
          {cartProducts.map(product=>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{parseFloat(product.price).toFixed(2)} €</td>
              <td>{product.quantity}</td>
              <td>{parseFloat(product.quantity * product.price).toFixed(2)} €</td>
            </tr>
          )}
          </tbody>
        </table>
      </main>
      <section>
        <div>
          <p><strong>Payment info:</strong></p>
          <p>Account: 1234 5678 9123</p>
          <p>A/C Name: Standard Bank</p>
          <p>BAnk details: Standard Bank</p>
        </div>
        <div>
          <p>Sub total: {parseFloat(totalPrice).toFixed(2)} €</p>
          <p>Vat (22%): {parseFloat(totalPrice *0.22).toFixed(2)} €</p>
          <p>Total price: {(totalPrice + totalPrice *0.22).toFixed(2)} €</p>
        </div>
      </section>
      <footer>
        <p>myCompany LTD</p>
        <p>Tel: 1234567890</p>
        <p>Terms and conditions:</p>
        <p>website: www.mycompany.com</p>
      </footer>
    </div>
  )
}