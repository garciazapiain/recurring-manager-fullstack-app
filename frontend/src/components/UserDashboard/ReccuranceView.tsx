/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
// @ts-ignore
import Button from '../Elements/Button.tsx';
import './style.css'
// @ts-ignore
import UpdateInventoryRecurranceForm from './UpdateInventoryRecurranceForm.tsx'

const RecurranceView = (props) => {
    const [toggleDaysUntilNextBuyEditMode, setToggleDaysUntilNextBuyEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(0)
    const inputRef = React.useRef(null);
    const [showUpdateInventoryForm, setShowUpdateInventoryForm] = useState(false)

    function daysRemainingCurrentValueClicked(e) {
        if (e.target.id === 'change-days-recurrance-current-value') {
            setToggleDaysUntilNextBuyEditMode(true)
        }
    }

    function manageToggleDaysUntilNextBuy() {
        if (!inputValue) {
            setToggleDaysUntilNextBuyEditMode(false)
            return
        }
        props.daysUntilNextBuyModified(inputValue)
        setToggleDaysUntilNextBuyEditMode(false)
    }

    function handleChange(e) {
        setInputValue(Number(e.target.value))
    }

    React.useEffect(() => {
        // add event listener when toggleDaysUntilNextBuyEditMode is true
        if (toggleDaysUntilNextBuyEditMode) {
            const handleClickOutside = (e) => {
                // check if the target is not inside the input element
                if (e.target.id === 'change-days-recurrance-input' || e.target.id === 'change-days-recurrance-current-value') {
                    return
                }
                else {
                    manageToggleDaysUntilNextBuy()
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                // remove event listener when component unmounts or toggleDaysUntilNextBuyEditMode changes
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [toggleDaysUntilNextBuyEditMode, inputValue]);

    function toggleUpdateInventoryForm() {
        setShowUpdateInventoryForm(!showUpdateInventoryForm)
    }

    React.useEffect(()=>{
        if(!showUpdateInventoryForm){
            props.getProducts()
        }
    },[showUpdateInventoryForm])

    return (
        <div>
            <div className="m-5 flex-column 100vw">
                <h2>Today's buying list</h2>
                <div className="flex">
                    {
                        toggleDaysUntilNextBuyEditMode ?
                            <>
                                <input ref={inputRef} id="change-days-recurrance-input" onChange={handleChange} className='changeDaysRecurranceInput'></input><h2>days until next buy</h2>
                            </> :
                            <h2 onClick={daysRemainingCurrentValueClicked} className="mr-2"><strong id="change-days-recurrance-current-value">{props.daysUntilNextBuy}</strong> days until next buy</h2>
                    }
                </div>
            </div>
            {showUpdateInventoryForm ?
                <div>
                    <UpdateInventoryRecurranceForm
                        rows={props.rows}
                        toggleUpdateInventoryForm={toggleUpdateInventoryForm}
                    />
                </div>
                : null
            }
            <table className='m-5 min-w-[90%]'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Inventory</th>
                        <th>Remaining days</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
            <div className='flex justify-center'>
                <Button onClick={toggleUpdateInventoryForm} text="Update inventory" class="button-generic"></Button>
            </div>
        </div>
    )
}

export default RecurranceView