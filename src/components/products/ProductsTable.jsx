import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
// import style from './products.module.css'
import style from './productsTable.module.css'
import Button from "../Button"
import { syncWithLocalStorage } from "features/productsSlice";

export default function ProductsTable({handleRemoveItem, handleEditItem,}){
  const dispatch = useDispatch();
  const imageRef = useRef();
  const products = useSelector(state => state.products)
  const [editView, setEditView] = useState(null)
  const [newProductName, setNewProductName] = useState('')
  const [newProductDescripiton, setNewProductDescripiton] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [productImage, setProductImage] = useState()
  const [newQuantityInStock, setNewQuantityInStock] = useState('');

  useEffect(() => {
    dispatch(syncWithLocalStorage())
  }, [dispatch]);

  function handleSetEditView(id){
    const product = products.find((p) => p.id === id);
    if (product) {
      setNewProductName(product.name);
      setNewProductDescripiton(product.description);
      setNewProductPrice(product.price);
      setNewQuantityInStock(product.stockQuantity);
      setProductImage(product.image);
    }
    setEditView(id)
  }
  function handleNameChange(e){
    setNewProductName(e.target.value)
  }
  function handleDescriptionChange(e){
    setNewProductDescripiton(e.target.value)
  }
  function handlePriceChange(e){
    setNewProductPrice(e.target.value)
  }
  function handleChangeImage(image){
    setProductImage(image)
  }
  function handleChangeQuantityInStock(e){
    setNewQuantityInStock(e.target.value)
  }

  return(
    <div className={style.tableContainer}>
      <table className={style.productsTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Picture</th>
            <th>Quantity in stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr 
              key={product.id}
            >
            {editView === product.id ?(
            <>
              <td>{product.id}</td>
              <td>
                <label>{product.name}</label>
                <input type="text" 
                  onChange={(e)=> handleNameChange(e)}
                  value={newProductName} />
              </td>
              <td>
                <label>{product.description}</label>
                <input type="text" 
                  onChange={(e)=> handleDescriptionChange(e)}
                  value={newProductDescripiton} />
              </td>
              <td>
                <label>{product.price}</label>
                <input type="text" 
                  onChange={(e)=> handlePriceChange(e)}
                  value={newProductPrice} />
              </td>
              <td>{product.image && <img src={product.image} alt="immagineProdotto"/>}
                <input 
                  ref={imageRef}
                  className={style.inputFile}
                  type="file"
                  onChange={(e)=> {
                    const file = e.target.files[0]
                    if(file){
                      const reader = new FileReader();
                      reader.onload = () => handleChangeImage(reader.result);
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                {productImage &&<img src={productImage} alt='immagine'/>}
              </td>
              <td>
                <label>{product.stockQuantity}</label>
                <input 
                  type="number" 
                  onChange={(e)=> handleChangeQuantityInStock(e)}
                  value={newQuantityInStock} />
              </td>
            </>)
            :
            <>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{
                product.image && <img src={product.image} alt="immagineProdotto"/>
              }</td>
              <td>{product.stockQuantity}</td>
            </>
            }
              <td className={style.tdActions}>  
              <Button
                  handleClick={()=>handleRemoveItem(product.id)}
                >Remove product</Button>
              {editView === product.id ?
              <>
              <Button
                handleClick={()=>{
                handleEditItem(
                  product.id,
                  newProductName,
                  newProductDescripiton,
                  newProductPrice,
                  productImage,
                  newQuantityInStock
                  )
                setEditView(null)
                setNewProductName('')
                setNewProductDescripiton('')
                setNewProductPrice('')
                setNewQuantityInStock('')
                }}
              >Save</Button>
              <Button
                handleClick={()=>{
                  setEditView(null)}
                  }
              >X</Button>
              </>
              :
              <Button
                  handleClick={(e)=>handleSetEditView(product.id)}
              >Edit product</Button>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}