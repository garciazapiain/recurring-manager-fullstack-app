import React, { useState } from "react";
import sharedStyles from "../shared/styles.module.css"
import { GiCancel } from "react-icons/gi";
import AddInventory from "../shared/ToggleInventory/AddInventory.jsx";
import SubtractInventory from "../shared/ToggleInventory/SubtractInventory.jsx";

const AddProductToUser = ({ onClose, productToAdd }) => {
    const [updatedInventory, setUpdatedInventory] = useState(0);

    const handleInventoryToggle = (operation) => {
        setUpdatedInventory((prevInventory) => {
            if (operation === "add") {
                return prevInventory + 1;
            } else {
                return prevInventory - 1;
            }
        });
    };

    const handleAddProductToUser = () => {
        let csrfToken;
        const cookies = document.cookie.split("; ");
        const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
        if (csrfCookie) {
            csrfToken = csrfCookie.split("=")[1];
        } else {
            console.log("CSRF token cookie not found");
        }
        fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/products/${productToAdd.id}/add-to-user-product/`,
            {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({
                    current_inventory: updatedInventory,
                }),
            }
        )
            .then((response) => {
                console.log("Response status:", response.status);
                return response.json();
            })
            .then((data) => {
                console.log(
                    `Product ${productToAdd.id} was added to user products successfully:`,
                    data
                );
                window.location.reload();
            })
            .catch((error) => {
                console.error(
                    `Error adding product ${productToAdd.id} to user products:`,
                    error
                );
            });
        onClose();
    };

    return (
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContent}>
                <div className={sharedStyles.modalContentHeader}>
                    <h2>Add product</h2>
                    <GiCancel onClick={onClose} />
                </div>
                <table className={sharedStyles.modalContentTable}>
                    <thead>
                        <tr className={sharedStyles.modalContentTableHead}>
                            <th>Product</th>
                            <th>Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={sharedStyles.modalDetailsRow}>
                            <td>{productToAdd.title} in {productToAdd.unit}</td>
                            <td>
                                <div className={sharedStyles.inventoryContainer}>
                                    <SubtractInventory inventory={updatedInventory} handleInventoryToggle={() => handleInventoryToggle("subtract")} />
                                    <input
                                        type="number"
                                        value={updatedInventory}
                                        onChange={(e) => setUpdatedInventory(parseInt(e.target.value))}
                                    />
                                    <AddInventory handleInventoryToggle={() => handleInventoryToggle("add")} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={sharedStyles.modalActions}>
                    <button className={sharedStyles.primaryButton} onClick={handleAddProductToUser}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductToUser;
