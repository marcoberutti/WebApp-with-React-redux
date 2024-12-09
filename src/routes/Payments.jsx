import { useSelector } from 'react-redux';
import style from './payments.module.css'
import { useState, useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import Button from "components/Button"
import Invoice from "components/invoice/Invoice"
import { pay } from 'features/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { forget, remember } from 'features/userInvoiceSlice';

export default function Payments(){

  const productsToPay = useSelector((state)=> state.cart.cart) || JSON.parse(localStorage.getItem('cart')) || []
  const user = useSelector((state)=> state.userInvoice.userInvoice) || JSON.parse(localStorage.getItem('userForInvoice'))

  let vatToPay;
  let sum;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInvoice, setShowInvoice] = useState(false)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const nameRef = useRef();
  const surnameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const printableRef = useRef();

  if(productsToPay.length > 0){
    sum = productsToPay
    .map(product =>product.price*product.quantity)
    .reduce((a,b) => a+b)
    vatToPay = parseFloat(sum).toFixed(2) * 0.22
  }

  const isFormValid = ()=>{
    return(
      name.trim() !== '' &&
      surname.trim() !== '' &&
      address.trim() !== '' &&
      email.trim() !== ''
    )
  }
  function handleChangeName(e){
    setName(e.target.value)
  }
  function handleChangeSurname(e){
    setSurname(e.target.value)
  }
  function handleChangeAddress(e){
    setAddress(e.target.value)
  }
  function handleChangeEmail(e){
    setEmail(e.target.value)
  }

  function handleRememberUser(e){
    e.preventDefault()
    let user = {
      name:name,
      surname: surname,
      address: address,
      email: email,
    }
    dispatch(remember(user))
  }

  function handleRemoveUser(e){
    e.preventDefault()
    dispatch(forget())
    setName('');
    setSurname('');
    setAddress('');
    setEmail('');

    if (nameRef.current) nameRef.current.value = '';
    if (surnameRef.current) surnameRef.current.value = '';
    if (addressRef.current) addressRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
  }

  const reactToPrintFn = useReactToPrint({ 
    contentRef: printableRef });

  function handlePayment() {
    let date = new Date()
    let timestamp = Date.parse(date)

    let productsWithTimestamp =
    productsToPay.map(product =>{
      return {...product, timestamp: timestamp}}
    )
    dispatch(pay(productsWithTimestamp))
    navigate('/home')
  }

  return (
    <>
      <div className={style.titleContainer}>
        <h1>Payment gateway:</h1>
        {!showInvoice ?
        <>
          <Button
            handleClick={()=>setShowInvoice(true)}
            disabled={!isFormValid()}
          >Show invoice</Button>
          <Button
            handleClick={()=>handlePayment()}
          >Proceed to pay</Button>
        </>
        :
        <div>
          <Button
          handleClick={()=>reactToPrintFn()}
          >Print</Button>
          <Button
            handleClick={()=>setShowInvoice(false)}
          >X</Button>
        </div>
        }
      </div>
      {!showInvoice ?
      <>
        <h4>Total to pay: {sum.toFixed(2)} €</h4>
        <h4>Vat: {vatToPay} € (22%)</h4>
        <h3>Gran total: {parseFloat(sum + vatToPay).toFixed(2)} €</h3>
        <br/>
        <div className={style.formContainer}>
          <form className={style.AddProductForm}>
          <h3>Insert your datas for the invoice</h3>
            <label>
              Name
              <input
              value={user? user.name : name}
              onChange={(e)=> handleChangeName(e)}
              ref={nameRef}
              type="text"/>
            </label>
            <label>
              Surname
              <input
              value={user? user.surname : surname}
              onChange={(e)=> handleChangeSurname(e)}
              ref={surnameRef} 
              type="text"/>
            </label>
            <label>
              Address
              <input
              value={user? user.address : address}
              onChange={(e)=> handleChangeAddress(e)}
              ref={addressRef} 
              type="text"/>
            </label>
            <label>
              Email
              <input
              value={user? user.email : email}
              onChange={(e)=> handleChangeEmail(e)}
              ref={emailRef} 
              type="email"/>
            </label>
            {
            (user.length > 0) &&
            <Button
            handleClick={(e)=>handleRemoveUser(e)}
            >Remove me</Button>
            }{
            (user.length === 0 ) && 
            <Button
              handleClick={(e)=>handleRememberUser(e)}
            >
              Remember me
            </Button>
            }
          </form>
        </div>
      </>
      :
      <Invoice 
        name={name}
        surname={surname}
        address={address}
        email={email}
        printableRef={printableRef}
      />
      }
    </>
  )
}