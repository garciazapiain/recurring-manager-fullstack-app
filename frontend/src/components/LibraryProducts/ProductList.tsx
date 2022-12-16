import React, { useState } from 'react';
import data from './data/products'
// @ts-ignore
import Product from './Product.tsx'
// @ts-ignore
import Button from '../Elements/Button.tsx'
// @ts-ignore
import NewProductForm from './NewProductForm.tsx';

function ProductList(props: any) {
    const [productModal, setProductModal] = useState(false)
    const [createProductForm, setCreateProductForm] = useState(false)
    const [dataFilter, setDataFilter] = useState([])
    const [rows, setRows] = useState([])
    const [dataRows, setDataRows] = useState([])
    let productDataSelection = props.productDataSelection.toLowerCase()
    let categoryTitle = props.productDataSelection.charAt(0).toUpperCase() + props.productDataSelection.slice(1)
    function productAdded() {
        alert('product added')
    }
    function createProductToggle() {
        setCreateProductForm(!createProductForm)
    }
    const createProductSubmit = (newProductData: any) => {
        const title = newProductData.title
        const description = newProductData.description
        const category = findCategoryNumber(newProductData.category)
        addNewProduct(title,description,category)
        setCreateProductForm(!createProductForm)
        getProducts()
    }

    function findCategoryName(id) {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }

    function findCategoryNumber(category){
        const object = props.categoriesData.find(obj => obj.name === category)
        const value = object ? object.id : null;
        return value
    }

    const ProductRow = ({ title, price, category }: { title: string, price: number, category: number }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>$ {price}</th>
            <th>{findCategoryName(category)}</th>
            <th className='text-center font-bold text-emerald-700'><button onClick={productAdded}>+</button></th>
        </tr>
    );

    async function getProducts() {
        await fetch(`http://127.0.0.1:8000/api/products/`)
            .then(response => response.json())
            .then(response => {
                setDataRows(response)
            })
    }

    React.useEffect(() => {
        getProducts()
    }, [createProductForm])

    React.useEffect(() => {
        productDataSelection == 'all-products' ? setDataFilter(dataRows) : setDataFilter(dataRows.filter(item => findCategoryName(item.category).toLowerCase() == productDataSelection))
    }, [dataRows])

    React.useEffect(() => {
        setRows(dataFilter.map((row) => <ProductRow {...row} />));
    }, [dataFilter])

    function addNewProduct(title, description, category) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, category:category, author:"1"})
        };
        fetch(`http://127.0.0.1:8000/api/products/`, requestOptions)
            .then(response => response.json())
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
                    />
                </div>
            }
            <table className='m-5 min-w-[90%]'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Average $</th>
                        <th>Category</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <div className="buttonFooterGeneric">
                <Button
                    onClick={() => createProductToggle()}
                    text="Add new product"
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