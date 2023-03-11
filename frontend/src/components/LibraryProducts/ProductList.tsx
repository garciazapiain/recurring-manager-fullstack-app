import React, { useState } from 'react';
// @ts-ignore
import Product from './Product.tsx'
// @ts-ignore
import Button from '../Elements/Button.tsx'
// @ts-ignore
import NewProductForm from './NewProductForm.tsx';
// @ts-ignore
import AddProductToUserForm from './AddProductToUserForm.tsx';
// @ts-ignore
import { ReactComponent as AddProduct } from '../../Svgs/add-product.svg'
// @ts-ignore
import { ReactComponent as AddedProduct } from '../../Svgs/check-product-added.svg'
// @ts-ignore
import ProductAddedMessage from './ProductAddedMessage.tsx';

function ProductList(props: any) {
    const [productModal, setProductModal] = useState(false)
    const [createProductForm, setCreateProductForm] = useState(false)
    const [addProductToUserForm, setAddProductToUserForm] = useState(false)
    const [dataFilter, setDataFilter] = useState([])
    const [rows, setRows] = useState([])
    const [dataRows, setDataRows] = useState([])
    const [productAddedMessage, setProductAddedMessage] = useState(false)
    let [productObjectToAddForUser, setProductObjectToAddForUser] = useState({})
    let [productTitleToAddForUser, setProductTitleToAddForUser] = useState("")
    let productDataSelection = props.productDataSelection.toLowerCase()
    let categoryTitle = props.productDataSelection.charAt(0).toUpperCase() + props.productDataSelection.slice(1)
    function productAdded(idAdded) {
        setAddProductToUserForm(true)
        const productObject = dataRows.find(obj => obj.id === idAdded)
        const { id, author, category, title, standard_size, unit, use_days, current_inventory } = productObject
        setProductObjectToAddForUser(productObject)
        setProductTitleToAddForUser(title)
    }
    const addProductSubmit = (productData: any) => {
        // @ts-ignore
        const productObject = dataRows.find(obj => obj.id === productObjectToAddForUser.id)
        const { id, author, category, title} = productObject
        const currentInventoryOriginal = productObject.current_inventory
        const inventoryUpdatedDateOriginal = productObject.inventory_updated_date
        const added = true
        const unit = productData.unit
        const use_days = productData.recurrance
        const standard_size = productData.standard_size
        const current_inventory = productData.current_inventory
        const inventory_updated_date = new Date() 
        // const inventory_updated_date = current_inventory != currentInventoryOriginal ? new Date() : inventoryUpdatedDateOriginal
        editProduct(id, author, category, title, added, unit, standard_size, use_days, current_inventory, inventory_updated_date)
    }
    function productRemove(idRemove) {
        const productObject = dataRows.find(obj => obj.id === idRemove)
        const { id, author, category, title, standard_size, unit, use_days, current_inventory } = productObject
        const added = false
        editProduct(id, author, category, title, added, standard_size, unit, use_days, current_inventory)
        getProducts()
    }
    function createProductToggle() {
        setCreateProductForm(!createProductForm)
    }
    function addProductToUserToggle() {
        setAddProductToUserForm(!addProductToUserForm)
    }
    // function productAddedMessageToggle(){
    //     setProductAddedMessage(!productAddedMessage)
    // }
    const createProductSubmit = (newProductData: any) => {
        const title = newProductData.title
        const category = findCategoryNumber(newProductData.category)
        const unit = newProductData.unit
        const use_days = newProductData.use_days
        const standard_size = newProductData.standard_size
        const current_inventory = 0;
        addNewProduct(title, category, unit, standard_size, use_days, current_inventory)
        setCreateProductForm(!createProductForm)
        getProducts()
    }

    function findCategoryName(id) {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }

    function findCategoryNumber(category) {
        const object = props.categoriesData.find(obj => obj.name === category)
        const value = object ? object.id : null;
        return value
    }

    const ProductRow = ({ title, category, id, added }: { title: string, category: number, id: string, added: boolean }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{findCategoryName(category)}</th>
            <th className='text-center font-bold text-emerald-700'>{added ? <button onClick={() => productRemove(id)}><AddedProduct /></button> : <button onClick={() => productAdded(id)}><AddProduct /></button>}</th>
        </tr>
    );

    async function getProducts() {
        await fetch(`https://recurring-manager-app.herokuapp.com/api/products/`)
            .then(response => response.json())
            .then(response => {
                setDataRows(response)
            })
    }

    React.useEffect(() => {
        getProducts()
    }, [createProductForm])

    React.useEffect(() => {
        if (props.categoriesData.length > 0) {
            productDataSelection == 'all-products' ? setDataFilter(dataRows) : setDataFilter(dataRows.filter(item => findCategoryName(item.category).toLowerCase() == productDataSelection))
        }
    }, [dataRows, productDataSelection])

    React.useEffect(() => {
        setRows(dataFilter.map((row) => <ProductRow {...row} />));
    }, [dataFilter, dataRows])

    function addNewProduct(title, category, unit, standard_size, use_days, current_inventory) {
        // Make a separate request to retrieve the CSRF token
        // fetch('/api/csrf_token/')
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data)
            // Use the retrieved token in the headers of the main request
            const requestOptions = {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken': 'eEu5OZC9wdOaoUHSJeKXcP4FctHLa3hG'
              },
              body: JSON.stringify({ 
                title: title, 
                category: category, 
                author: "1", 
                unit:unit, 
                standard_size:standard_size,
                use_days:use_days, 
                current_inventory:current_inventory,
                inventory_updated_date: null
              })
            };
            fetch(`https://recurring-manager-app.herokuapp.com/api/products/`, requestOptions)
              .then(response => response.json());
        //   });
      }
          
    function editProduct(id, author, category, title, added, unit, standard_size, use_days, current_inventory, inventory_updated_date?) {
        setAddProductToUserForm(false)
        // setProductAddedMessage(true)
        // fetch('/api/csrf_token/')
        //   .then(response => response.json())
        //   .then(data => {
            // console.log(data)
            const requestOptions = {
                method: 'PUT',
                headers: { 
                  'Content-Type': 'application/json',
                  'X-CSRFToken': 'eEu5OZC9wdOaoUHSJeKXcP4FctHLa3hG'
                },
                body: JSON.stringify({ 
                  title: title, 
                  category: category, 
                  author: author, 
                  unit:unit, 
                  standard_size:standard_size,
                  use_days:use_days, 
                  current_inventory:current_inventory,
                  inventory_updated_date: inventory_updated_date,
                  added:added
                })
              };
        fetch(`https://recurring-manager-app.herokuapp.com/api/products/${id}/`, requestOptions)
            .then(response => response.json())
            .then(getProducts)
        // })
    }

    return (
        <div>
            <h2 className="m-5 text-4xl">Products</h2>
            <h4 className="m-5">Filtered by:</h4>
            <h2 className='m-5 text-lg'> {categoryTitle} category</h2>
            {createProductForm &&
                <div className='flex justify-center'>
                    <NewProductForm
                        createProductSubmit={createProductSubmit}
                        createProductToggle={createProductToggle}
                        productDataSelection={productDataSelection}
                        categoriesData={props.categoriesData}
                    />
                </div>
            }
            {addProductToUserForm &&
                <div className='flex justify-center'>
                    <AddProductToUserForm
                        addProductToUserToggle={addProductToUserToggle}
                        productInformation={productObjectToAddForUser}
                        productTitleToAddForUser={productTitleToAddForUser}
                        addProductSubmit={addProductSubmit}
                    />
                </div>
            }
            {/* {productAddedMessage &&
                <div className='flex justify-center'>
                    <ProductAddedMessage       
                    />
                </div>
            } */}
            <table className='m-5 min-w-[90%]'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Add/remove</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <div className="buttonFooterGeneric">
                <Button
                    onClick={() => createProductToggle()}
                    text="Create new product"
                    class="button-generic"
                />
            </div>
            {productModal &&
                <div>
                    <Product
                        productModal={productModal}
                    />
                </div>
            }
        </div>
    )
}

export default ProductList;