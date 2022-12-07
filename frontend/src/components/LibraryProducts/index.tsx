import React, { useState } from 'react';
// @ts-ignore
import CategoriesPage from "./CategoriesPage.tsx";
// @ts-ignore
import ProductList from "./ProductList.tsx"
import { Routes, Route } from "react-router-dom";

const LibraryProducts = () => {
    const [productDataSelection, setProductDataSelection] = useState('all-products')
    function cardClicked(title:string){
        setProductDataSelection(title)
    }
    return(
        <>
        <Routes>
            <Route path="" 
                element={
                    <CategoriesPage
                        cardClicked={cardClicked}
                    />
                }>
            </Route>
            <Route path="/all-products" 
                element={
                    <ProductList
                        productDataSelection = {productDataSelection}
                    />
                }>
            </Route>
        </Routes>
        </>
    )
}

export default LibraryProducts