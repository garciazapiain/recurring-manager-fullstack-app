// @ts-ignore
import React from "react";
// @ts-ignore
import './style.css'
// @ts-ignore
import { ReactComponent as AddProduct } from '../../Svgs/add-product.svg'
// @ts-ignore
import { ReactComponent as AddedProduct } from '../../Svgs/check-product-added.svg'
// @ts-ignore

const AddOrRemove = (props: any) => {
    return (
        <div>
            {props.added ? 
                <button data-cy="button-added" onClick={() => props.productRemove(props.id)}>
                    <AddedProduct />
                </button>
                :
                <button data-cy="button-not-added" onClick={() => props.productAdded(props.id)}>
                    <AddProduct />
                </button>
            }
        </div>
    )
}

export default AddOrRemove;