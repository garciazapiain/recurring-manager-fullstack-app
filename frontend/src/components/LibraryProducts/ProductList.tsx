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
    const [dataRows, setDataRows] = useState(data)
    let productDataSelection = props.productDataSelection.toLowerCase()
    let categoryTitle = props.productDataSelection.charAt(0).toUpperCase() + props.productDataSelection.slice(1)
    function productAdded() {
        alert('product added')
    }
    function createProductToggle() {
        console.log(createProductForm)
        setCreateProductForm(!createProductForm)
    }
    const createProductSubmit = (newProductData: any) => {
        setDataRows(prev => [...prev, newProductData])
        setCreateProductForm(!createProductForm)
    }

    const ProductRow = ({ title, price, category }: { title: string, price: number, category: string }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>$ {price}</th>
            <th>{category}</th>
            <th className='text-center font-bold text-emerald-700'><button onClick={productAdded}>+</button></th>
        </tr>
    );

    React.useEffect(() => {
        productDataSelection == 'all-products' ? setDataFilter(dataRows) : setDataFilter(dataRows.filter(item => item.category == productDataSelection))
    }, [dataRows])

    React.useEffect(() => {
        setRows(dataFilter.map((row) => <ProductRow {...row} />));
    }, [dataFilter])

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