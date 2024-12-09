import { useSelector } from "react-redux"
import { useRef, useState } from "react"
// import style from './products.module.css'
import style from './productsTable.module.css'
import Button from "../Button"

export default function ProductsTable({
  handleRemoveItem, 
  handleEditItem,
  }){

  const imageRef = useRef();

  const products = useSelector(state => state.products)
  const [editView, setEditView] = useState(null)
  const [newProductName, setNewProductName] = useState('')
  const [newProductDescripiton, setNewProductDescripiton] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [productImage, setProductImage] = useState()

  function handleSetEditView(id){
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
                value={newProductName} /></td>
              <td>
              <label>{product.description}</label>
              <input type="text" 
                onChange={(e)=> handleDescriptionChange(e)}
                value={newProductDescripiton} /></td>
              <td>
              <label>{product.price}</label>
              <input type="text" 
                onChange={(e)=> handlePriceChange(e)}
                value={newProductPrice} /></td>
              <td>{
                product.image && <img src={product.image} alt="immagineProdotto"/>
              }
              <input 
                ref={imageRef}
                onChange={(e)=> {
                  const file = e.target.files[0]
                  if(file){
                    const reader = new FileReader();
                    reader.onload = () => handleChangeImage(reader.result);
                    reader.readAsDataURL(file)
                  }
                }}
                type="file"/>
                { productImage &&
                  <img src={productImage} alt='immagine' />
                }
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
                  productImage
                  )
                setEditView(null)
                setNewProductName('')
                setNewProductDescripiton('')
                setNewProductPrice('')
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