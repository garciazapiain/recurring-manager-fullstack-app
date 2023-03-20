import React from 'react';
import './style.css'

function UpdateInventoryRecurranceForm(props: any) {
    return (
        <div className="newProductFormContainerBackground">
            <div className="newProductFormContainer">
                <div className="dismissButtonWrapper">
                    <button onClick={props.toggleUpdateInventoryForm}>X</button>
                </div>
                <div>
                    {props.rows}
                </div>
            </div>
        </div>
    )
}

export default UpdateInventoryRecurranceForm