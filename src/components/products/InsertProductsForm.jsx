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
  productImage
}){
  return(
    <div className={style.formContainer}>
    <form className={style.AddProductForm}>
      <label>
        product name
        <input 
        ref={nameRef}
        onChange={handleChangeName}
        value={productName}
        type="text"/>
      </label>
      <label>
        product description
        <input 
        ref={descriptionRef}
        onChange={handleChangeDescription}
        value={productDescription}
        type="text"/>
      </label>
      <label>
        product price
        <input 
        ref={priceRef}
        onChange={handleChangePrice}
        value={productPrice}
        type="text"/>
      </label>
      <label>
        product image
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