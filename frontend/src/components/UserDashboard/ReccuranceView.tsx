
import React, { useState, useEffect } from 'react';
// @ts-ignore
import Button from '../Elements/Button.tsx'

const RecurranceView = (props) => {
    const [toggleDaysUntilNextBuyEditMode, setToggleDaysUntilNextBuyEditMode] = useState(true)
    const [inputValue, setInputValue] = useState(0)

    function manageToggleDaysUntilNextBuy(){
        if(!toggleDaysUntilNextBuyEditMode){
            saveButtonClicked()
        }
        setToggleDaysUntilNextBuyEditMode(!toggleDaysUntilNextBuyEditMode)
    }
    function handleChange(e){
        setInputValue(e.target.value)
    }
    function saveButtonClicked(){
        if(inputValue===0){
            return null
        }
        props.daysUntilNextBuyModified(inputValue)
    }
    return (
        <div>
            {/* <div className="m-5 flex 100vw text-sm">
                <p>Next buying list on: </p>
                <p>30/01/2023</p>
            </div> */}
            <div className="m-5 flex-column 100vw">
                <h2>Today's buying list</h2>
                <div className="flex">
                    {
                        toggleDaysUntilNextBuyEditMode?
                        <h2 className="mr-2"><strong>{props.daysUntilNextBuy}</strong> days until next buy</h2>:
                        <>
                        <input onChange={handleChange} className='w-10 border-1 border-solid border-black'></input><h2>days until next buy</h2>
                        </>
                    }
                    {
                        toggleDaysUntilNextBuyEditMode? <Button onClick={manageToggleDaysUntilNextBuy} text="edit" class="button-generic-small"/> : <Button text="save" class="button-generic-small"  onClick={manageToggleDaysUntilNextBuy}/>
                    }
                </div>
            </div>
            <table className='m-5 min-w-[90%]'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Current inventory</th>
                        <th>Remaining days</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
        </div>
    )
}

export default RecurranceView