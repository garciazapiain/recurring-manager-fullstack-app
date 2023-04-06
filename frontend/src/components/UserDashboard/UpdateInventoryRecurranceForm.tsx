/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.css'
import { ReactComponent as DecreaseInventory } from '../../Svgs/decrease-inventory.svg'
import { ReactComponent as IncreaseInventory } from '../../Svgs/increase-inventory.svg'
// @ts-ignore
import estimatedCurrentInventory from '../utils/EstimatedCurrentInventory.tsx'
// @ts-ignore
import Button from '../Elements/Button.tsx';

function UpdateInventoryRecurranceForm(props: any) {
  const productList = props.rows.filter(item => item ? item.props : null)
  const productListForm = productList.map(item => item.props)
  const [productListFormModifications, setProductListFormModifications] = React.useState(productListForm)
  function decreaseCurrentInventory(id) {
    const updatedObjects = productListFormModifications.map(obj => {
      if (obj.id === id) {
        return { ...obj, current_inventory: (obj.current_inventory - 1) === 0 ? 0 : obj.current_inventory - 1 };
      }
      return obj;
    });
    setProductListFormModifications(updatedObjects)
  }
  function increaseCurrentInventory(id) {
    const updatedObjects = productListFormModifications.map(obj => {
      if (obj.id === id) {
        return { ...obj, current_inventory: obj.current_inventory + 1 };
      }
      return obj;
    });
    setProductListFormModifications(updatedObjects)
  }
  function updateInventory() {
    productListFormModifications.map(obj => {
      const inventory_updated_date = new Date()
      const newInventory = Math.ceil(estimatedCurrentInventory(obj.current_inventory, obj.inventory_updated_date, obj.use_days, obj.standard_size))
      return editProduct(obj.id, obj.author, obj.category, obj.title, obj.added, obj.standard_size, obj.use_days, obj.unit, newInventory, inventory_updated_date)
    })
    props.toggleUpdateInventoryForm()
  }
  function editProduct(id, author, category, title, added, standard_size, use_days, unit, current_inventory,inventory_updated_date ) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, category: category, author: author, id: id, added: added, unit: unit, standard_size: standard_size, use_days: use_days, current_inventory: current_inventory, inventory_updated_date: inventory_updated_date })
    };
    fetch(`https://recurring-manager-app.herokuapp.com/api/products/${id}/`, requestOptions)
      .then(response => response.json())
  }
  const ProductListFormContent = React.useCallback(() => {
    const mapping = productListFormModifications.length > 0 ? productListFormModifications : productListForm.productListForm
    return mapping.map((item) =>
      <div className='flex m-5 items-center'>
        <h1 className='mx-1 w-3/6'>{item.title}</h1>
        <div className='flex w-2/6 justify-center items-center'>
          <DecreaseInventory onClick={() => decreaseCurrentInventory(item.id)} />
          <h2 className='mx-2 text-md'>{Math.ceil(estimatedCurrentInventory(item.current_inventory, item.inventory_updated_date, item.use_days, item.standard_size))}</h2>
          <IncreaseInventory onClick={() => increaseCurrentInventory(item.id)} />
        </div>
        <h2 className='mx-2 w-1/6 text-md'>{item.unit}</h2>
      </div>
    );
  }, [productListFormModifications]);

  return (
    <div className="newProductFormContainerBackground">
      <div className="newProductFormContainer">
        <h1 className='m-5 text-3xl'>Update inventory</h1>
        <div className="dismissButtonWrapper">
          <button onClick={props.toggleUpdateInventoryForm}>X</button>
        </div>
        <div>
          <ProductListFormContent productListForm={productListForm} />
          <Button
            onClick={updateInventory}
            text="Update"
            class="button-generic"
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateInventoryRecurranceForm