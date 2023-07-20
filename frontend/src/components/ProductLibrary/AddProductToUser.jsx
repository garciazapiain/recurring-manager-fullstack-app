import React, { useState } from "react";
import styles from "./styles.module.css";

const AddProductToUser = ({ onClose, productToAdd }) => {
    const [updatedInventory, setUpdatedInventory] = useState(0);

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
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Add Product To User</h2>
                <table className={styles.inventoryTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{productToAdd.title}</td>
                            <td>
                                <input
                                    type="number"
                                    value={updatedInventory}
                                    onChange={(e) => setUpdatedInventory(parseInt(e.target.value))}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.modalActions}>
                    <button onClick={handleAddProductToUser}>Add to User</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductToUser;
