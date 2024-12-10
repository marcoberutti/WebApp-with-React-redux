import style from './insertProductsForm.module.css'
import Button from '../Button'

export default function InsertProductsForm({
  nameRef,
  handleChangeName,
  productName,
  descriptionRef,
  handleChangeDescription,
  productDescription,
  handleAddProduct,
  priceRef,
  handleChangePrice,
  productPrice,
  imageRef,
  handleChangeImage,
  productImage,
  handleChangeQuantity,
  stockQuantityRef,
  productStockQuantity
}){
  return(
    <div className={style.formContainer}>
    <form className={style.AddProductForm}>
      <label>
        Product name
        <input 
        ref={nameRef}
        onChange={handleChangeName}
        value={productName}
        type="text"/>
      </label>
      <label>
        Product description
        <input 
        ref={descriptionRef}
        onChange={handleChangeDescription}
        value={productDescription}
        type="text"/>
      </label>
      <label>
        Product price
        <input 
        ref={priceRef}
        onChange={handleChangePrice}
        value={productPrice}
        type="number"/>
      </label>
      <label>
        Quantity in stock
        <input 
        ref={stockQuantityRef}
        onChange={handleChangeQuantity}
        value={productStockQuantity}
        type="number"/>
      </label>
      <label className={style.fileLabel}>
        Product image
        <input
        ref={imageRef}
        onChange={handleChangeImage}
        type="file"/>
      </label>
      <Button
        handleClick={handleAddProduct}
      >Add Product</Button>
    </form>
    { productImage &&
      <img src={productImage} alt='immagine' />
    }
    </div>
  )
}