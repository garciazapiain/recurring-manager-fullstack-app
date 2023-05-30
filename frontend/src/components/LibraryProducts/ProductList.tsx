import React, { useContext, useState } from 'react';
// @ts-ignore
import Product from './Product.tsx'
// @ts-ignore
import Button from '../Elements/Button.tsx'
// @ts-ignore
import NewProductForm from './NewProductForm.tsx';
// @ts-ignore
import AddProductToUserForm from './AddProductToUserForm.tsx';
// @ts-ignore
import productObjectType from '.././LibraryProducts/ts/types'
// @ts-ignore
import AddOrRemove from '../Elements/AddOrRemove.tsx';
// @ts-ignore
import AuthContext from '../../AuthContext.js';


function ProductList(props: any) {
    const [productModal] = useState(false)
    const [createProductForm, setCreateProductForm] = useState(false)
    const [addProductToUserForm, setAddProductToUserForm] = useState(false)
    const [dataFilter, setDataFilter] = useState([])
    const [rows, setRows] = useState([])
    const [dataRows, setDataRows] = useState<Array<productObjectType>>([])
    const user = useContext(AuthContext);
    let [productObjectToAddForUser, setProductObjectToAddForUser] = useState({})
    let [productTitleToAddForUser, setProductTitleToAddForUser] = useState<{} | productObjectType>({});
    let productDataSelection = props.productDataSelection.toLowerCase()
    let categoryTitle = props.productDataSelection.charAt(0).toUpperCase() + props.productDataSelection.slice(1)
    const addProductSubmit = (productData: any) => {
        const productObject = dataRows.find(obj => obj.id === productObjectToAddForUser.id)
        if (productObject) {
            let { id, author, category, title } = productObject;
            const added = true
            const unit = productData.unit
            const use_days = productData.use_days
            const standard_size = productData.standard_size
            const current_inventory = productData.current_inventory
            const inventory_updated_date = new Date()
            editProduct(id, author, category, title, added, standard_size, unit, use_days, current_inventory, inventory_updated_date)
        }
        setAddProductToUserForm(false)
        getProducts()
    }
    function createProductToggle() {
        setCreateProductForm(!createProductForm)
    }
    function addProductToUserToggle() {
        setAddProductToUserForm(!addProductToUserForm)
    }
    const createProductSubmit = (newProductData: any) => {
        const title = newProductData.title
        const category = findCategoryNumber(newProductData.category)
        const unit = newProductData.unit
        const use_days = newProductData.use_days
        const standard_size = newProductData.standard_size
        const current_inventory = 0;
        const author = user;
        addNewProduct(title, category, unit, standard_size, use_days, current_inventory,author)
        setCreateProductForm(!createProductForm)
        getProducts()
    }

    const editProduct = React.useCallback((id, author, category, title, added, standard_size, unit, use_days, current_inventory, inventory_updated_date?) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setAddProductToUserForm(false)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                category: category,
                author: author,
                unit: unit,
                standard_size: standard_size,
                use_days: use_days,
                current_inventory: current_inventory,
                inventory_updated_date: inventory_updated_date,
                added: added
            })
        };
        const path = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://recurring-manager-app.herokuapp.com'
        fetch(`${path}/api/products/${id}/`, requestOptions)
            .then(response => response.json())
            .then(getProducts)
    }, [])

    const productAdded = React.useCallback((idAdded) => {
        setAddProductToUserForm(true)
        const productObject = dataRows.find(obj => obj.id === idAdded)
        const { title } = productObject
        setProductObjectToAddForUser(productObject)
        setProductTitleToAddForUser(title)
        getProducts()
    }, [dataRows])

    const productRemove = React.useCallback((idRemove) => {
        const productObject = dataRows.find(obj => obj.id === idRemove)
        const { id, author, category, title, standard_size, unit, use_days, current_inventory } = productObject
        const added = false
        editProduct(id, author, category, title, added, standard_size, unit, use_days, current_inventory)
        setAddProductToUserForm(false)
        getProducts()
    }, [dataRows, editProduct])

    const findCategoryName = React.useCallback((id) => {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }, [props.categoriesData]);


    function findCategoryNumber(category) {
        const object = props.categoriesData.find(obj => obj.name === category)
        const value = object ? object.id : null;
        return value
    }

    const ProductRow = React.useCallback(({ title, category, id, added }: { title: string, category: number, id: string, added: boolean }) => (
        <tr key={id} className='text-center'>
            <th>{title}</th>
            <th>{findCategoryName(category)}</th>
            <th><AddOrRemove added={added} id={id} productRemove={productRemove} productAdded={productAdded} /></th>
        </tr>
    ), [findCategoryName, productAdded, productRemove]);

    async function getProducts() {
        const path = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://recurring-manager-app.herokuapp.com'
        const requestOptions = {
            credentials: 'include'
        }
        await fetch(`${path}/api/products/`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setDataRows(response)
            })
    }

    React.useEffect(() => {
        getProducts()
    }, [])

    React.useEffect(() => {
        if (props.categoriesData.length > 0) {
            productDataSelection === 'all-products' ? setDataFilter(dataRows) : setDataFilter(dataRows.filter(item => {
                const categoryName = findCategoryName(item.category);
                return categoryName ? categoryName.toLowerCase() === productDataSelection : false;
            }))
        }
    }, [dataRows, productDataSelection, findCategoryName, props.categoriesData.length])

    React.useEffect(() => {
        setRows(dataFilter.map((row) => <ProductRow {...row} />));
    }, [dataFilter, ProductRow])

    function addNewProduct(title, category, unit, standard_size, use_days, current_inventory,author) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                title: title,
                category: category,
                unit: unit,
                standard_size: standard_size,
                use_days: use_days,
                current_inventory: current_inventory,
                inventory_updated_date: null,
                author: author.id
            }),
            credentials:"include"
        };
        const path = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://recurring-manager-app.herokuapp.com'
        fetch(`${path}/api/products/`, requestOptions)
            .then(response => response.json())
            .then(getProducts)
    }

    return (
        <div>
            <h2 className="m-5 text-4xl">Explore products</h2>
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
                        formToggle={addProductToUserToggle}
                        productInformation={productObjectToAddForUser}
                        productTitleToAddForUser={productTitleToAddForUser}
                        addProductSubmit={addProductSubmit}
                    />
                </div>
            }
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