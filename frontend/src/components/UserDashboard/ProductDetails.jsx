import React, { useState } from "react";
import sharedStyles from "../shared/styles.module.css";
import { GiCancel } from 'react-icons/gi';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { UNIT_CHOICES } from "../shared/utils.jsx";
import AddInventory from "../shared/ToggleInventory/AddInventory.jsx"
import SubtractInventory from "../shared/ToggleInventory/SubtractInventory.jsx"

const ProductDetails = ({ onClose, product }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleEditModeToggle = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleInventoryToggle = (operation) => {
        setEditedProduct((prevProduct) => {
            let updatedInventory = prevProduct.estimated_inventory;
            if (operation === "add") {
                updatedInventory += 1; // Increase inventory by 1
            } else if (operation === "subtract") {
                updatedInventory = Math.max(0, updatedInventory - 1); // Decrease inventory by 1, but not below 0
            }
            return { ...prevProduct, estimated_inventory: updatedInventory };
        });
    };

    const handleSaveChanges = () => {
        let csrfToken
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
        if (csrfCookie) {
            csrfToken = csrfCookie.split('=')[1];
        } else {
            console.log('CSRF token cookie not found');
        }
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/userproducts/${product.id}/update-details/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                // Send only the fields you want to update
                title: editedProduct.title,
                current_inventory: editedProduct.estimated_inventory,
                standard_size: editedProduct.standard_size,
                unit: editedProduct.unit,
                use_days: editedProduct.use_days,
                // Add other fields here if needed
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Product updated successfully:", data);
                // Update the product state with the edited details
                // Exit edit mode
                window.location.reload();
                setEditMode(false);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                // Handle error if needed
            });
    };

    const removeProduct = (id) => {
        let csrfToken
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
        if (csrfCookie) {
            csrfToken = csrfCookie.split('=')[1];
        } else {
            console.log('CSRF token cookie not found');
        }
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/userproducts/${id}/`, {
            method: 'DELETE',
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
            },
        })
            .then((response) => {
                if (response.status === 204) {
                    console.log(`UserProduct ${id} removed successfully`);
                    window.location.reload();
                } else {
                    console.error(`Error removing UserProduct ${id}`);
                }
            })
            .catch((error) => {
                console.error(`Error removing UserProduct ${id}:`, error);
            });
    }

    return (
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContent}>
                <div className={sharedStyles.modalContentHeader}>
                    <h1>Product Details</h1>
                    <GiCancel size={30} onClick={onClose} />
                </div>
                {editMode ? (
                    <>
                        <div className={sharedStyles.modalDetailsRow}>
                            <p>Title:</p>
                            <input
                                type="text"
                                name="title"
                                value={editedProduct.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={sharedStyles.modalDetailsRow}>
                            <p>Inventory:</p>
                            <div className={sharedStyles.inventoryContainer}>
                                <SubtractInventory inventory={editedProduct.estimated_inventory} handleInventoryToggle={() => handleInventoryToggle("subtract")} />
                                <input
                                    type="number"
                                    name="estimated_inventory"
                                    value={Math.round(editedProduct.estimated_inventory)}
                                    onChange={handleInputChange}
                                />
                                <AddInventory handleInventoryToggle={() => handleInventoryToggle("add")} />
                            </div>
                        </div>
                        <div className={sharedStyles.modalDetailsRow}>
                            <p>Unit:</p>
                            <select
                                name="unit"
                                value={editedProduct.unit}
                                onChange={handleInputChange}
                                required // Add required attribute for validation
                            >
                                <option value="">Select a unit</option>
                                {UNIT_CHOICES.map((choice) => (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={sharedStyles.modalDetailsRow}>
                            <p>Standard Size:</p>
                            <input
                                type="number"
                                name="standard_size"
                                value={editedProduct.standard_size}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={sharedStyles.modalDetailsRow}>
                            <p>Use Days:</p>
                            <input
                                type="number"
                                name="use_days"
                                value={editedProduct.use_days}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={sharedStyles.modalActions}>
                            <button className={sharedStyles.primaryButton} onClick={handleSaveChanges}>Save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={sharedStyles.modalDetailsRow}><p>Title:</p> <p>{product.title}</p></div>
                        <div className={sharedStyles.modalDetailsRow}><p>Inventory:</p> <p>{Math.round(product.estimated_inventory)}</p></div>
                        <div className={sharedStyles.modalDetailsRow}><p>Unit:</p> <p>{product.unit}</p></div>
                        <div className={sharedStyles.modalDetailsRow}><p>Standard Size:</p> <p>{product.standard_size}</p></div>
                        <div className={sharedStyles.modalDetailsRow}><p>Use Days:</p> <p>{product.use_days}</p></div>
                        <div className={sharedStyles.modalActions}>
                            <AiFillEdit size={30} onClick={handleEditModeToggle} />
                            <AiFillDelete size={30} onClick={() => removeProduct(product.id)} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
