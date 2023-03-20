
import React, { useState } from 'react';
// @ts-ignore
import AddProductToUserForm from '../LibraryProducts/AddProductToUserForm.tsx';
// @ts-ignore
import { productObjectType } from '../LibraryProducts/ts/types';
import './style.css'
// @ts-ignore
import Button from '../Elements/Button.tsx'
import { useNavigate } from 'react-router-dom'

const AllProducts = (props) => {
    let navigate = useNavigate();
    const [editProductUserDashboardForm, setEditProductUserDashboardForm] = useState(false)
    let [productObjectToAddForUser, setProductObjectToAddForUser] = useState({})
    let [productTitleToAddForUser, setProductTitleToAddForUser] = useState<{} | productObjectType>({});
    React.useEffect(()=>{
        if(props.editProductTriggered){
            const productObject = props.rows.find(obj => obj.props.id === props.editProductTriggered)
            const title = productObject.props.title
            setProductObjectToAddForUser(productObject.props)
            setProductTitleToAddForUser(title)
            setEditProductUserDashboardForm(true)
        }
    },[props.editProductTriggered, props.rows])
    const addProductSubmit = (productData: any) => {
        const productObject = props.rows.find(obj => obj.props.id === productObjectToAddForUser.id)
        if (productObject) {
            let { id, author, category, title } = productObject.props;
            const added = true
            const unit = productData.unit
            const use_days = productData.use_days
            const standard_size = productData.standard_size
            const current_inventory = productData.current_inventory
            const inventory_updated_date = new Date()
            props.editProduct(id, author, category, title, added, standard_size, use_days, unit, current_inventory, inventory_updated_date)
        }
        setEditProductUserDashboardForm(false)
        props.getProducts()
    }
    function formToggle() {
        setEditProductUserDashboardForm(!editProductUserDashboardForm)
        props.setEditProductTriggered(undefined)
    }
    function categoriesPage() {
        navigate("/productcategories");
    }
    return (
        <>
        {editProductUserDashboardForm &&
            <div className='flex justify-center'>
                <AddProductToUserForm
                    formToggle={formToggle}
                    productInformation={productObjectToAddForUser}
                    productTitleToAddForUser={productTitleToAddForUser}
                    addProductSubmit={addProductSubmit}
                />
            </div>
        }
        <table className='m-5 min-w-[90%]'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Inventory</th>
                    <th className='w-1'>Remaining Days</th>
                    <th>Delete</th>
                    <>
                </>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
        <div className="buttonsUserDashboard">
                <Button
                    onClick={categoriesPage}
                    text="Add new product"
                    class="button-generic"
                />
        </div>
        </>
    )
}

export default AllProducts