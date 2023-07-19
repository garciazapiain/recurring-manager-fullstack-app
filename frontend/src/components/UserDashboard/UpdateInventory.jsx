import React, { useState } from "react";
import styles from "./styles.module.css";

const UpdateInventory = ({ onClose, products }) => {
    const [productInventory, setProductInventory] = useState(
        products.map((product) => ({
            id: product.id,
            title: product.title,
            original_inventory: product.estimated_inventory,
            updated_inventory: product.estimated_inventory,
        }))
    );

    const handleInputChange = (productId, value) => {
        setProductInventory((prevState) =>
            prevState.map((product) =>
                product.id === productId ? { ...product, updated_inventory: value } : product
            )
        );
    };

    const handleSave = () => {
        // Iterate over productInventory and make API calls for each product ID
        let csrfToken
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
        if (csrfCookie) {
            csrfToken = csrfCookie.split('=')[1];
            console.log(csrfToken);
        } else {
            console.log('CSRF token cookie not found');
        }
        productInventory.forEach((product) => {
            if (product.original_inventory != product.updated_inventory) {
                fetch(`${process.env.REACT_APP_API_BASE_URL}/api/userproducts/${product.id}/update-inventory/`, {
                    method: 'PUT',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Replace 'csrftoken' with the name of your CSRF cookie
                    },
                    body: JSON.stringify({
                        'current_inventory': product.updated_inventory,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Product ${product.id} inventory updated successfully:`, data);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error(`Error updating product ${product.id} inventory:`, error);
                    });
            }
        });

        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Update Inventory</h2>
                <table className={styles.inventoryTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productInventory.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={product.updated_inventory}
                                        onChange={(e) =>
                                            handleInputChange(product.id, parseInt(e.target.value))
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.modalActions}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateInventory;
