import React from 'react';
import { useForm } from 'react-hook-form';
import './style.css'

function NewProductForm(props: any) {
    const { register, handleSubmit, setValue } = useForm();
    const [editToggleUnit, setEditToggleUnit] = React.useState(false)
    const [editToggleStandardSize, setEditToggleStandardSize] = React.useState(false)
    const [editToggleRecurrance, setEditToggleRecurrance] = React.useState(false)
    const [editToggleCurrentInventory, setEditToggleCurrentInventory] = React.useState(false)
    return (
        <div className="newProductFormContainerBackground">
            <div className="newProductFormContainer">
                <div className="dismissButtonWrapper">
                    <button onClick={props.addProductToUserToggle}>X</button>
                </div>
                <div>
                    <h1 className="m-5 text-3xl">{props.productTitleToAddForUser}</h1>
                    <div className="flex items-center">
                        <h2 className="m-5 text-md" >Unit: </h2>
                        {
                            editToggleUnit ? (
                                <input {...register("unit")} className='w-10 mr-5'></input>
                            )
                                : <h2 {...setValue('unit', props.productInformation.unit)} className='w-10 mr-5'>{props.productInformation.unit}</h2>
                        }
                        {
                            !editToggleUnit ? (
                                <button onClick={() => setEditToggleUnit(true)} className='button-generic-small'>edit</button>
                            )
                                :
                                <button onClick={() => setEditToggleUnit(false)} className='button-generic-small'>X</button>
                        }
                    </div>
                    <div className="flex items-center">
                        <h2 className="m-5 text-md">For Standard Size: </h2>
                        {
                            editToggleStandardSize ? (
                                <input {...register("standard_size")} className='w-10 mr-5'></input>
                            )
                                : <h2 {...setValue('standard_size', props.productInformation.standard_size)} className='w-10 mr-5'>{props.productInformation.standard_size}</h2>
                        }
                        {
                            !editToggleStandardSize ? (
                                <button onClick={() => setEditToggleStandardSize(true)} className='button-generic-small'>edit</button>
                            )
                                :
                                <button onClick={() => setEditToggleStandardSize(false)} className='button-generic-small'>X</button>
                        }
                    </div>
                    <div className="flex items-center">
                        <h2 className="m-5 text-md">Use days:</h2>
                        {
                            editToggleRecurrance ? (
                                <input {...register("use_days")} className='w-10 mr-5'></input>
                            )
                                : <h2 {...setValue('use_days', props.productInformation.use_days)} className='w-10 mr-5'>{props.productInformation.use_days}</h2>
                        }
                        {
                            !editToggleRecurrance ? (
                                <button onClick={() => setEditToggleRecurrance(true)} className='button-generic-small'>edit</button>
                            )
                                :
                                <button onClick={() => setEditToggleRecurrance(false)} className='button-generic-small'>X</button>
                        }
                        <h2 className="m-5 text-md">days</h2>
                    </div>
                    <div className="flex items-center">
                        <h2 className="m-5 text-md">Current inventory:</h2>
                        {
                            editToggleCurrentInventory? (
                                <input {...register("current_inventory")} className='w-10 mr-5'></input>
                            )
                                : <h2 {...setValue('current_inventory', props.productInformation.current_inventory)} className='w-10 mr-5'>{props.productInformation.current_inventory}</h2>
                        }
                        {
                            !editToggleCurrentInventory ? (
                                <button onClick={() => setEditToggleCurrentInventory(true)} className='button-generic-small'>edit</button>
                            )
                                :
                                <button onClick={() => setEditToggleCurrentInventory(false)} className='button-generic-small'>X</button>
                        }
                    </div>
                    <form onSubmit={handleSubmit(props.addProductSubmit)}>
                        <div className="flex justify-center">
                            <button type="submit" className='button-generic'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductForm