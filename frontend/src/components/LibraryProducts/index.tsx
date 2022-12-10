import React, { useState } from 'react';
// @ts-ignore
import CategoriesPage from "./CategoriesPage.tsx";
// @ts-ignore
import ProductList from "./ProductList.tsx"
import { Routes, Route } from "react-router-dom";

const LibraryProducts = () => {
    const [productDataSelection, setProductDataSelection] = useState('all-products')
    function cardClicked(name:string, event){
        setProductDataSelection(name)
    }
    console.log(productDataSelection)
    const [categoriesData, setCategoriesData] = React.useState([])
    async function getCategoriesData() {
        await fetch(`http://127.0.0.1:8000/api/productcategories/`)
        .then(response => response.json())
        .then(response=>{
            setCategoriesData(response)
        })
    }
    React.useEffect(()=>{
        getCategoriesData()
    },[])
    return(
        <>
        <Routes>
            <Route path="" 
                element={
                    <CategoriesPage
                        cardClicked={cardClicked}
                        categoriesData={categoriesData}
                    />
                }>
            </Route>
            <Route path={`/${productDataSelection}`} 
                element={
                    <ProductList
                        productDataSelection = {productDataSelection}
                        categoriesData={categoriesData}
                    />
                }>
            </Route>
        </Routes>
        </>
    )
}

export default LibraryProducts