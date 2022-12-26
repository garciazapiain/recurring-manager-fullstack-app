import React, { useState, useEffect } from 'react';
import './style.css'

const UserProductsPage = (props) => {
    const [userProductsList, setUserProductsList] = useState([])
    const [rows, setRows] = useState([])
    async function getProducts() {
        await fetch(`http://127.0.0.1:8000/api/products/`)
            .then(response => response.json())
            .then(response => {
                const arrayCreated = []
                for (const item of response){
                    if(item.added){
                        arrayCreated.push(item)
                    }
                }
                setUserProductsList(arrayCreated)
            })
    }
    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (Object.keys(userProductsList).length > 0) {
            setRows(userProductsList.map((row) => <ProductRow {...row} />))
        }
    }, [userProductsList])

    function findCategoryName(id) {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }
    function deleteProduct(idDeleted) {
        const productObject = userProductsList.find(obj => obj.id === idDeleted) 
        const {id, author, category, description, title} = productObject
        const added = false
        editProduct(id, author, category, description, title, added)
        alert('product deleted')
    }
    function editProduct(id, author, category, description, title, added){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description:description, category:category, author:author, id:id, added:added })
        };
        fetch(`http://127.0.0.1:8000/api/products/${id}/`, requestOptions)
            .then(response => response.json())
            getProducts()
    }
    const ProductRow = ({ title, category, id }: { title: string, category: number, id: string }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{findCategoryName(category)}</th>
            <th className='text-center font-bold text-red-700'><button onClick={()=>deleteProduct(id)}>-</button></th>
        </tr>
    );
    return (
        <div>
            <h1 className="m-5 text-4xl">User Products Page</h1>
            <table className='m-5 min-w-[90%]'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default UserProductsPage