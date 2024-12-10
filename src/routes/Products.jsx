import React from "react"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, editProduct, removeProduct } from "../features/productsSlice"
import { nanoid } from "nanoid"
import style from './productScroll.module.css'
import ScrollContainer from "react-indiana-drag-scroll"
import ProductsTable from "components/products/ProductsTable"
import InsertProductsForm from "components/products/InsertProductsForm"
import Button from "components/Button"
import Charts from "components/products/Charts"
import SoldItemsDB from "components/products/SoldItemsDB"

export default function Products(){
  const dispatch = useDispatch()
  const [actionRoute, setActionRoute] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productImage, setProductImage] = useState()
  const [productStockQuantity, setProductStockQuantity] = useState(0)

  const products = useSelector((state) => state.products); // Leggi lo stato
  const nameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const imageRef = useRef()
  const stockQuantityRef= useRef();

  useEffect(()=>{
      localStorage.setItem('products2', JSON.stringify(products))
  },[products])

  useEffect(()=>{
    if(actionRoute === 'table'){
      nameRef.current.focus()
    }
  },[actionRoute])

  function handleAddProduct(e) {
    e.preventDefault()
    if (productName.trim()) {
      const newProduct = { 
        id: nanoid(), 
        name: productName, 
        description: productDescription,
        price: productPrice,
        image: productImage,
        stockQuantity: productStockQuantity,
        quantity: 1
      };
      dispatch(addProduct(newProduct)); // Invio l'azione
      setProductName("");
      setProductDescription('')
      setProductPrice('')
      setProductImage(null)
      setProductStockQuantity(0)
      nameRef.current.focus()
      imageRef.current.value = ""
      
    }
  }

  function handleEditItem(id, name, description, price, image, stockQuantity){
    dispatch(editProduct({
      id,
      name, 
      description,
      price,
      image,
      stockQuantity
    }))
  }

  function handleRemoveItem(id){
    dispatch(removeProduct(
      id
    ))
  }

  function handleChangeName(e){
    setProductName(e.target.value)
  }
  
  function handleChangeDescription(e){
    setProductDescription(e.target.value)
  }

  function handleChangePrice(e){
    setProductPrice(e.target.value)
  }

  function handleChangeQuantity(e){
    setProductStockQuantity(e.target.value)
  }

  function handleChangeImage(e){
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setProductImage(reader.result)
      };
      reader.readAsDataURL(file)
    }
  }

  function handleView(name){
    setActionRoute(name)
  }

  const renderContent = () => {
    switch(actionRoute) {
      case 'scroll':
        return <div className={style.mainContainer}>
        <Button
          handleClick={()=>setActionRoute('')}
        >
        X
        </Button>
        <ScrollContainer className={style.scrollContainer}>
          {products.map((product) => {
            return(
            <div className={style.scrollCard} key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.id}</p>
              <p>{product.description}</p>
              <img src={product.image} alt="immagineProdotto" />
              <p>{product.price}</p>
            </div>
            )
          })}
        </ScrollContainer>
      </div>
      case 'charts':
        return <Charts/>
      case 'table':
        return <div className={style.mainContainer}>
        <InsertProductsForm
          nameRef={nameRef}
          handleChangeName={handleChangeName}
          productName={productName}
          descriptionRef={descriptionRef}
          handleChangeDescription={handleChangeDescription}
          productDescription={productDescription}
          handleAddProduct={handleAddProduct}
          priceRef={priceRef}
          handleChangePrice={handleChangePrice}
          productPrice={productPrice}
          imageRef={imageRef}
          handleChangeImage={handleChangeImage}
          productImage={productImage}
          stockQuantityRef={stockQuantityRef}
          handleChangeQuantity={handleChangeQuantity}
          productStockQuantity={productStockQuantity}
        />
        <ProductsTable 
          handleRemoveItem={handleRemoveItem}
          handleEditItem={handleEditItem}
        />
      </div>
      case 'db':
        return <SoldItemsDB/>
      default:
        return <h1>management place</h1>
    }
  }

  return(
    <>
      <div className={style.headerBtnContainer}>
        <Button
          handleClick={()=>handleView('scroll')}
        >
          Scroll view
        </Button>
        <Button
          handleClick={()=>handleView('table')}
        >
          View table products
        </Button>
        <Button
          handleClick={()=>handleView('charts')}
        >
          View charts
        </Button>
        <Button
          handleClick={()=>handleView('db')}
        >
          View sold items database
        </Button>
      </div>
      <div>
        {renderContent()}
      </div>
    </>

  )
  
}