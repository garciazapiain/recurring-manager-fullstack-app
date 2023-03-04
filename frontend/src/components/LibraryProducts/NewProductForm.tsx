import React from 'react';
import { useForm } from 'react-hook-form';

function NewProductForm(props: any) {
    const { register, handleSubmit } = useForm();
    const optionsList = props.categoriesData.map((item) =>
        <option selected={props.productDataSelection === item.name.toLowerCase() ? true : false} key={item.id} value={item.name}>{item.name}</option>
    );
    return (
        <div className="newProductFormContainerBackground">
            <div className="newProductFormContainer">
                <div className="dismissButtonWrapper">
                    <button onClick={props.createProductToggle}>X</button>
                </div>
                <div>
                    <h1 className="m-5 text-3xl">Create new product</h1>
                </div>
                <div>
                    <h2 className="m-5 text-lg">Please fill out form</h2>
                </div>
                <div>
                    <form className="newProductFormForm" onSubmit={handleSubmit(props.createProductSubmit)}>
                        <input className="newProductFormInput" placeholder="Product name" {...register("title")} />
                        <input className="newProductFormInput" placeholder="Description" {...register("description")} />
                        <select className="newProductFormInput" placeholder="Category" {...register("category")}>
                            {optionsList}
                        </select>
                        <input className="newProductFormInput" placeholder="Unit" {...register("unit")} />
                        <input className="newProductFormInput" placeholder="Standard size" {...register("standard_size")} />
                        <input className="newProductFormInput" placeholder="Use days" {...register("use_days")} />
                        <input className="newProductFormFormSubmit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm