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
                        <input className="newProductFormInput" placeholder="Description" {...register("description")} />
                        <select className="newProductFormInput" placeholder="Category" {...register("category")}>
                            <option selected={props.productDataSelection === 'beauty' ? true : false} value="Beauty">Beauty</option>
                            <option selected={props.productDataSelection === 'cooking' ? true : false} value="Cooking">Cooking</option>
                            <option selected={props.productDataSelection === 'health' ? true : false} value="Health">Health</option>
                            <option selected={props.productDataSelection === 'cleaning' ? true : false} value="Cleaning">Cleaning</option>
                            <option selected={props.productDataSelection === 'electronics' ? true : false} value="Electronics">Electronics</option>
                        </select>
                        <input className="newProductFormFormSubmit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm