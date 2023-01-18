
import React, { useState, useEffect } from 'react';

const RecurranceView = (props) => {
    return (
        <div>
            <div className="m-5 flex 100vw text-sm">
                <p>Next buying list on: </p>
                <p>30/01/2023</p>
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