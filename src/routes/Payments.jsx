import { useSelector, useDispatch } from 'react-redux';
import style from './payments.module.css'
import { useState, useRef, useEffect } from "react"
import { useReactToPrint } from 'react-to-print';
import Button from "components/Button"
import Invoice from "components/invoice/Invoice"
import { pay } from 'features/cartSlice';
import { useNavigate } from 'react-router';
import { forget, remember } from 'features/userInvoiceSlice';
import { updateQuantity } from 'features/quantitySlice';

export default function Payments(){
  const productsToPay = useSelector((state)=> state.cart.cart)
  const user = useSelector((state)=> state.userInvoice.userInvoice[0])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInvoice, setShowInvoice] = useState(false)
  const [name, setName] = useState(user?.name || '');
  const [surname, setSurname] = useState(user?.surname || '');
  const [address, setAddress] = useState(user?.address || '');
  const [email, setEmail] = useState(user?.email || '');
  const [filedsCompiled, setFieldsCompiled] = useState()
  const nameRef = useRef();
  const surnameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const printableRef = useRef();
  let vatToPay;
  let sum;
  let quantity;

  if(productsToPay.length > 0){
    sum = productsToPay
    .map(product =>product.price*product.quantity)
    .reduce((a,b) => a+b)
    vatToPay = parseFloat(sum).toFixed(2) * 0.22
    let productsQuantity = []
    productsToPay.map(product => 
      productsQuantity.push(product.quantity)
    )
    quantity= productsQuantity.reduce((a,b)=> a+b)
  }

  const isFormValid = ()=>{
    return(
      name.trim() !== '' &&
      surname.trim() !== '' &&
      address.trim() !== '' &&
      email.trim() !== ''
    )
  }

  // useEffect(() => {
  //   if(name !== '' && surname !== '' && address !== '' && email !== ''){
  //     setFieldsCompiled(true)
  //   }
  // }, [isFormValid()]);

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
    let productToUpdateQuantity = productsToPay.map(product =>{
      return {id:product.id, quantity: product.quantity
      }
    })
    dispatch(pay(productsWithTimestamp))
    dispatch(updateQuantity(productToUpdateQuantity))
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
        <div className={style.headerResumePrices}>
          <h4>Total to pay: {parseFloat(sum).toFixed(2)} €</h4>
          <h4>Vat: {parseFloat(vatToPay).toFixed(2)} € (22%)</h4>
          <h4>Quantity of all items: {quantity}</h4>
          <h3>Gran total: {parseFloat(sum + vatToPay).toFixed(2)} €</h3>
        </div>
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
            user &&
            <Button
            handleClick={(e)=>handleRemoveUser(e)}
            >Remove me</Button>
            }{
            !user && 
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