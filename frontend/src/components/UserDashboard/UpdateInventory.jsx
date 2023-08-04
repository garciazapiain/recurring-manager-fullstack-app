import React, { useState } from "react";
import sharedStyles from "../shared/styles.module.css"
import { GiCancel } from 'react-icons/gi';

const UpdateInventory = ({ onClose, products }) => {
    const [productInventory, setProductInventory] = useState(
        products.map((product) => ({
            id: product.id,
            title: product.title,
            original_inventory: product.estimated_inventory,
            updated_inventory: product.estimated_inventory,
            unit: product.unit
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
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContent}>
                <div className={sharedStyles.modalContentHeader}>
                    <h2>Update Inventory</h2>
                    <GiCancel onClick={onClose} />
                </div>
                <table>
                    <thead>
                        <tr className={sharedStyles.modalContentTableHead}>
                            <th>Product</th>
                            <th>Inventory</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productInventory.map((product) => (
                            <tr className={sharedStyles.modalDetailsRow} key={product.id}>
                                <td>{product.title}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={Math.round(product.updated_inventory)}
                                        onChange={(e) =>
                                            handleInputChange(product.id, parseInt(e.target.value))
                                        }
                                    />
                                </td>
                                <td>{product.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={sharedStyles.modalActions}>
                    <button className={sharedStyles.primaryButton} onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateInventory;
