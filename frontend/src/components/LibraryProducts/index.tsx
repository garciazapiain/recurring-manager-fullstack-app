import React, { useState } from 'react';
// @ts-ignore
import CategoriesPage from "./CategoriesPage.tsx";
// @ts-ignore
import ProductList from "./ProductList.tsx"
// @ts-ignore
import Home from "./Home.tsx"
// @ts-ignore
import UserProductsPage from "./UserProductsPage.tsx"
import { Routes, Route } from "react-router-dom";
// @ts-ignore
import NavBar from '../NavBar/NavBar.tsx';

const LibraryProducts = () => {
    const [productDataSelection, setProductDataSelection] = useState(window.location.pathname.substring(1))
    function cardClicked(name: string, event) {
        setProductDataSelection(name)
    }
    const [categoriesData, setCategoriesData] = React.useState([])
    async function getCategoriesData() {
        await fetch(`http://127.0.0.1:8000/api/productcategories/`)
            .then(response => response.json())
            .then(response => {
                setCategoriesData(response)
            })
    }
    React.useEffect(() => {
        getCategoriesData()
    }, [])
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path=""
                    element={
                        <Home
                        />
                    }>
                </Route>
                <Route path="/productcategories"
                    element={
                        <CategoriesPage
                            cardClicked={cardClicked}
                            categoriesData={categoriesData}
                        />
                    }>
                </Route>
                <Route path={`/userproducts`}
                    element={
                        <UserProductsPage
                            categoriesData={categoriesData}
                        />
                    }>
                </Route>
                <Route path={`/${productDataSelection}`}
                    element={
                        <ProductList
                            productDataSelection={productDataSelection}
                            categoriesData={categoriesData}
                        />
                    }>
                </Route>
            </Routes>
        </>
    )
}

export default LibraryProducts