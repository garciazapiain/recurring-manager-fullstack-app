import React, { useState } from "react";
import styles from './styles.module.css'
import sharedStyles from "../shared/styles.module.css";
import { GiCancel } from 'react-icons/gi';
import { AiFillEdit, AiFillDelete, AiFillInfoCircle } from 'react-icons/ai';
import { UNIT_CHOICES } from "../shared/utils.jsx";
import AddInventory from "../shared/ToggleInventory/AddInventory.jsx"
import SubtractInventory from "../shared/ToggleInventory/SubtractInventory.jsx"
import { Tooltip } from "react-tooltip";

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
                    <div className={styles.productDetailsRowContainer}>
                        <div className={sharedStyles.productDetailsRow}>
                            <p className={styles.productDetailsRowDetailHeading}>Title:</p>
                            <input
                                type="text"
                                name="title"
                                value={editedProduct.title}
                                onChange={handleInputChange}
                                className={styles.productDetailsRowDetailInfoEditMode}
                            />
                        </div>
                        <div className={sharedStyles.productDetailsRow}>
                            <p className={styles.productDetailsRowDetailHeading}>Inventory:</p>
                            <div className={sharedStyles.inventoryContainer}>
                                <SubtractInventory inventory={editedProduct.estimated_inventory} handleInventoryToggle={() => handleInventoryToggle("subtract")} />
                                <input
                                    type="number"
                                    name="estimated_inventory"
                                    value={Math.round(editedProduct.estimated_inventory)}
                                    onChange={handleInputChange}
                                    className={styles.productDetailsRowDetailInfoEditMode}
                                />
                                <AddInventory handleInventoryToggle={() => handleInventoryToggle("add")} />
                            </div>
                        </div>
                        <div className={sharedStyles.productDetailsRow}>
                            <p className={styles.productDetailsRowDetailHeading}>Unit:</p>
                            <select
                                name="unit"
                                value={editedProduct.unit}
                                onChange={handleInputChange}
                                required // Add required attribute for validation
                                className={styles.productDetailsRowDetailInfoEditMode}
                            >
                                <option value="">Select a unit</option>
                                {UNIT_CHOICES.map((choice) => (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={sharedStyles.productDetailsRow}>
                            <div className={styles.modalDetailsTitleWithInfobox} data-tooltip-content="Most common size of product you used, based on the unit." data-tooltip-place="top" data-tooltip-id="standardSize">
                                <p className={styles.productDetailsRowDetailHeading}>Standard Size:</p>
                                <AiFillInfoCircle size={10} />
                                <Tooltip id="standardSize" />
                            </div>
                            <input
                                type="number"
                                name="standard_size"
                                value={editedProduct.standard_size}
                                onChange={handleInputChange}
                                className={styles.productDetailsRowDetailInfoEditMode}
                            />
                        </div>
                        <div className={sharedStyles.productDetailsRow}>
                            <div className={styles.modalDetailsTitleWithInfobox} data-tooltip-content="On average, how much does the product last considering standard size." data-tooltip-place="top" data-tooltip-id="useDays">
                                <p className={styles.productDetailsRowDetailHeading}>Use Days:</p>
                                <AiFillInfoCircle size={10} />
                                <Tooltip id="useDays" />
                            </div>
                            <input
                                type="number"
                                name="use_days"
                                value={editedProduct.use_days}
                                onChange={handleInputChange}
                                className={styles.productDetailsRowDetailInfoEditMode}
                            />
                        </div>
                        </div>
                        <div className={sharedStyles.modalActions}>
                            <button className={sharedStyles.primaryButton} onClick={handleSaveChanges}>Save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.productDetailsRowContainer}>
                            <div className={styles.productDetailsRow}><p className={styles.productDetailsRowDetailHeading}>Title:</p> <p className={styles.productDetailsRowDetailInfo}>{product.title}</p></div>
                            <div className={styles.productDetailsRow}><p className={styles.productDetailsRowDetailHeading}>Inventory:</p> <p className={styles.productDetailsRowDetailInfo}>{Math.round(product.estimated_inventory)}</p></div>
                            <div className={styles.productDetailsRow}><p className={styles.productDetailsRowDetailHeading}>Unit:</p> <p className={styles.productDetailsRowDetailInfo}>{product.unit}</p></div>
                            <div className={styles.productDetailsRow}><p className={styles.productDetailsRowDetailHeading}>Standard Size:</p> <p className={styles.productDetailsRowDetailInfo}>{product.standard_size}</p></div>
                            <div className={styles.productDetailsRow}><p className={styles.productDetailsRowDetailHeading}>Use Days:</p> <p className={styles.productDetailsRowDetailInfo}>{product.use_days}</p></div>
                        </div>
                        <div className={styles.modalActions}>
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
