/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
// @ts-ignore
import Button from '../Elements/Button.tsx'
// @ts-ignore
import AllProducts from './AllProducts.tsx';
// @ts-ignore
import RecurranceView from './ReccuranceView.tsx';
// @ts-ignore
import { ReactComponent as EditProduct } from '../../Svgs/edit-product.svg'
// @ts-ignore
import './style.css'

const UserDashboard = (props) => {
    const [userProductsList, setUserProductsList] = useState([])
    const [allProductsRows, setAllProductsRows] = useState([])
    const [recurranceRows, setRecurranceRows] = useState([])
    const [recurranceViewShow, setRecurranceViewShow] = useState(true)
    const [allProductsViewShow, setAllProductsShow] = useState(false)
    const [daysUntilNextBuy, setDaysUntilNextBuy] = useState(15)
    const [editProductTriggered, setEditProductTriggered] = useState(undefined)
    
    async function getProducts() {
        await fetch(`https://recurring-manager-app.herokuapp.com/api/products/`)
            .then(response => response.json())
            .then(response => {
                const arrayCreated = []
                for (const item of response) {
                    if (item.added) {
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
            setAllProductsRows(userProductsList.map((row) => <AllProductRow {...row} />))
            setRecurranceRows(userProductsList.map((row) => ((row.use_days / row.standard_size) * currentInventoryFunction(row.current_inventory, row.inventory_updated_date, row.use_days, row.standard_size)) < daysUntilNextBuy ? <RecurranceRow {...row} /> : null))
        }
    }, [userProductsList, daysUntilNextBuy])

    function findCategoryName(id) {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }
    function deleteProduct(idDeleted) {
        const productObject = userProductsList.find(obj => obj.id === idDeleted)
        const { id, author, category, title, standard_size, use_days, unit, current_inventory } = productObject
        const added = false
        editProduct(id, author, category, title, added, standard_size, use_days, unit, current_inventory)
        alert('product deleted')
    }
    function editProduct(id, author, category, title, added, standard_size, use_days, unit, current_inventory) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, category: category, author: author, id: id, added: added, unit: unit, standard_size: standard_size, use_days: use_days, current_inventory: current_inventory })
        };
        fetch(`https://recurring-manager-app.herokuapp.com/api/products/${id}/`, requestOptions)
            .then(response => response.json())
        getProducts()
    }
    const AllProductRow = ({ title, category, id, current_inventory, unit, use_days, standard_size, inventory_updated_date  }: { title: string, category: number, id: string, current_inventory: number, unit: number, use_days: number, standard_size: number, inventory_updated_date: string }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{findCategoryName(category)}</th>
            <th>{currentInventoryFunction(current_inventory, inventory_updated_date, use_days, standard_size).toFixed(0)} ({unit})</th>
            <th>{(use_days / standard_size * currentInventoryFunction(current_inventory, inventory_updated_date, use_days, standard_size)).toFixed(0)}</th>
            <th className='text-center font-bold text-blue-700'><button onClick={() => setEditProductTriggered(id)}><EditProduct/></button></th>
            <th className='text-center font-bold text-red-700'><button onClick={() => deleteProduct(id)}>-</button></th>
        </tr>
    );
    // fix the mixup of unit and standard size is wrong
    const RecurranceRow = ({ title, current_inventory, unit, use_days, standard_size, inventory_updated_date }: { title: string, current_inventory: number, unit: number, use_days: number, standard_size: number, inventory_updated_date: string }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{currentInventoryFunction(current_inventory, inventory_updated_date, use_days, standard_size).toFixed(0)} ({unit})</th>
            <th>{(use_days / standard_size * currentInventoryFunction(current_inventory, inventory_updated_date, use_days, standard_size)).toFixed(0)}</th>
        </tr>
    );
    function toggleButtons(button) {
        if (button === "recurranceView") {
            setRecurranceViewShow(true)
            setAllProductsShow(false)
        }
        else if (button === "allProducts") {
            setRecurranceViewShow(false)
            setAllProductsShow(true)
        }
    }

    function daysUntilNextBuyModified(newValue) {
        console.log('hey ', newValue)
        setDaysUntilNextBuy(newValue)
    }

    function currentInventoryFunction(original_inventory, inventory_updated_date, use_days, standard_size) {
        //refactor date formattted
        const unitsPerDay = (standard_size / use_days)
        const dateNow = new Date();
        const dateSplit = inventory_updated_date.split("")
        const dateYear = dateSplit.slice(0, 4).join("")
        const dateDay = dateSplit.slice(8, 10).join("")
        const dateMonth = dateSplit.slice(5, 7).join("")
        const dateFormatted = new Date(`${dateMonth}/${dateDay}/${dateYear}`)
        // @ts-ignore
        const diffTime = Math.abs(dateFormatted - dateNow);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const adjustedInventory = original_inventory - (diffDays * unitsPerDay)
        return adjustedInventory > 0 ? adjustedInventory : 0;
    }

    return (
        <div>
            <h1 className="m-5 text-4xl">My products</h1>
            <div className="buttonsUserDashboard">
                <Button
                    onClick={() => toggleButtons("recurranceView")}
                    text="Recurrance"
                    class="button-generic-small"
                />
                <Button
                    onClick={() => toggleButtons("allProducts")}
                    text="All products"
                    class="button-generic-small"
                    datacy="user-page-all-products-button"
                />
            </div>
            <div>
                {recurranceViewShow ?
                    <RecurranceView
                        rows={recurranceRows}
                        daysUntilNextBuy={daysUntilNextBuy}
                        daysUntilNextBuyModified={daysUntilNextBuyModified}
                    />
                    :
                    allProductsViewShow ?
                        <AllProducts setEditProductTriggered={setEditProductTriggered} editProductTriggered={editProductTriggered} editProduct={editProduct} getProducts={getProducts} rows={allProductsRows} />
                        :
                            null
                }
            </div>
        </div>
    )
}

export default UserDashboard