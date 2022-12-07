import React from 'react';

function Product(props:any){
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hey</h1>
            {props.productModal}
        </div>
    )
}

export default Product