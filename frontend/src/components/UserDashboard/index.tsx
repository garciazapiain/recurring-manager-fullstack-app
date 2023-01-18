import React, { useState, useEffect } from 'react';
// @ts-ignore
import Button from '../Elements/Button.tsx'
// @ts-ignore
import AllProducts from './AllProducts.tsx';
// @ts-ignore
import RecurranceView from './ReccuranceView.tsx';
// @ts-ignore
import Settings from './Settings.tsx';
// @ts-ignore
import './style.css'

const UserDashboard = (props) => {
    const [userProductsList, setUserProductsList] = useState([])
    const [allProductsRows, setAllProductsRows] = useState([])
    const [recurranceRows, setRecurranceRows] = useState([])
    const [recurranceViewShow, setRecurranceViewShow] = useState(true)
    const [allProductsViewShow, setAllProductsShow] = useState(false)
    const [settingsShow, setSettingsShow] = useState(false)
    async function getProducts() {
        await fetch(`http://127.0.0.1:8000/api/products/`)
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

    console.log(userProductsList)

    useEffect(() => {
        if (Object.keys(userProductsList).length > 0) {
            setAllProductsRows(userProductsList.map((row) => <AllProductRow {...row} />))
            setRecurranceRows(userProductsList.map((row) => ((row.use_days/row.unit) * row.current_inventory) < 15 ? <RecurranceRow {...row} /> : null))
        }
    }, [userProductsList])

    function findCategoryName(id) {
        const object = props.categoriesData.find(obj => obj.id === id)
        const value = object ? object.name : null;
        return value
    }
    function deleteProduct(idDeleted) {
        const productObject = userProductsList.find(obj => obj.id === idDeleted)
        const { id, author, category, description, title, standard_size, use_days, unit, current_inventory } = productObject
        const added = false
        editProduct(id, author, category, description, title, added, standard_size, use_days, unit, current_inventory)
        alert('product deleted')
    }
    function editProduct(id, author, category, description, title, added, standard_size, use_days, unit, current_inventory) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, category: category, author: author, id: id, added: added, unit: unit, standard_size: standard_size, use_days: use_days, current_inventory: current_inventory })
        };
        fetch(`http://127.0.0.1:8000/api/products/${id}/`, requestOptions)
            .then(response => response.json())
        getProducts()
    }
    const AllProductRow = ({ title, category, id }: { title: string, category: number, id: string }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{findCategoryName(category)}</th>
            <th className='text-center font-bold text-red-700'><button onClick={() => deleteProduct(id)}>-</button></th>
        </tr>
    );
    // fix the mixup of unit and standard size is wrong
    const RecurranceRow = ({ title, current_inventory, unit, use_days }: { title: string, current_inventory: number, unit:number, use_days:number }) => (
        <tr className='text-center'>
            <th>{title}</th>
            <th>{current_inventory}</th>
            <th>{((use_days/unit) * current_inventory).toFixed(0)}</th>
        </tr>
    );
    function toggleButtons(button) {
        console.log(button)
        if (button === "recurranceView") {
            setRecurranceViewShow(true)
            setAllProductsShow(false)
            setSettingsShow(false)
        }
        else if (button === "allProducts") {
            setRecurranceViewShow(false)
            setAllProductsShow(true)
            setSettingsShow(false)
        }
        else if (button === "settings") {
            setRecurranceViewShow(false)
            setAllProductsShow(false)
            setSettingsShow(true)
        }
    }

    return (
        <div>
            <h1 className="m-5 text-4xl">User Products Page</h1>
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
                />
                <Button
                    onClick={() => toggleButtons("settings")}
                    text="Settings"
                    class="button-generic-small"
                />
            </div>
            <div>
                {recurranceViewShow ?
                    <RecurranceView 
                        rows={recurranceRows}
                    />
                    :
                    allProductsViewShow ?
                        <AllProducts rows={allProductsRows} />
                        :
                        settingsShow ?
                            <Settings />
                            :
                            null
                }
            </div>
        </div>
    )
}

export default UserDashboard