import React, { useState } from 'react';
// @ts-ignore
import CategoriesPage from "./CategoriesPage.tsx";
// @ts-ignore
import ProductList from "./ProductList.tsx"
// @ts-ignore
import UserDashboard from "../UserDashboard/index.tsx"
import { Routes, Route } from "react-router-dom";
// @ts-ignore
import NavBar from '../NavBar/NavBar.tsx';
// @ts-ignore
import Django from './Django.tsx';

const LibraryProducts = () => {
    const [productDataSelection, setProductDataSelection] = useState(window.location.pathname.substring(1))
    function cardClicked(name: string, event) {
        setProductDataSelection(name)
    }
    const [categoriesData, setCategoriesData] = React.useState([])
    async function getCategoriesData() {
        await fetch(`https://recurring-manager-app.herokuapp.com/api/productcategories/`)
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
                        <UserDashboard
                        categoriesData={categoriesData}
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
                <Route path={`/${productDataSelection}`}
                    element={
                        <ProductList
                            productDataSelection={productDataSelection}
                            categoriesData={categoriesData}
                        />
                    }>
                </Route>
                <Route path="*" element={<Django />} />
            </Routes>
        </>
    )
}

export default LibraryProducts