import React from 'react';
import { useForm } from 'react-hook-form';

function NewProductForm(props: any) {
    const { register, handleSubmit } = useForm();
    return (
        <div className="newProductFormContainerBackground">
            <div className="newProductFormContainer">
                <div className="dismissButtonWrapper">
                    <button onClick={props.createProductToggle}>X</button>
                </div>
                <div>
                    <h1 className="m-5 text-3xl">Add new product</h1>
                </div>
                <div>
                    <h2 className="m-5 text-lg">Please fill out form</h2>
                </div>
                <div>
                    <form className="newProductFormForm" onSubmit={handleSubmit(props.createProductSubmit)}>
                        <input className="newProductFormInput" placeholder="Product name" {...register("title")} />
                        <input className="newProductFormInput" placeholder="Category" {...register("category")} />
                        <input className="newProductFormFormSubmit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm