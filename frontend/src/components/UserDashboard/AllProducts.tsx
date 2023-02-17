
import React, { useState, useEffect } from 'react';

const AllProducts = (props) => {
    return (
        <table className='m-5 min-w-[90%]'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    )
}

export default AllProducts