/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

const RecurranceView = (props) => {
    const [toggleDaysUntilNextBuyEditMode, setToggleDaysUntilNextBuyEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(0)
    const inputRef = React.useRef(null);

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