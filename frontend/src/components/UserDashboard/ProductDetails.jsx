import React, { useState } from "react";
import styles from "./styles.module.css";

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

    console.log(editedProduct.title)

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
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h1>Product Details</h1>
                {editMode ? (
                    <>
                        <p>
                            Title:{" "}
                            <input
                                type="text"
                                name="title"
                                value={editedProduct.title}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            Estimated Current Inventory:{" "}
                            <input
                                type="number"
                                name="estimated_inventory"
                                value={editedProduct.estimated_inventory}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            Standard Size:{" "}
                            <input
                                type="number"
                                name="standard_size"
                                value={editedProduct.standard_size}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            Unit:{" "}
                            <input
                                type="text"
                                name="unit"
                                value={editedProduct.unit}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            Use Days:{" "}
                            <input
                                type="number"
                                name="use_days"
                                value={editedProduct.use_days}
                                onChange={handleInputChange}
                            />
                        </p>
                        <div className={styles.modalActions}>
                            <button onClick={handleSaveChanges}>Save</button>
                            <button onClick={handleEditModeToggle}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Title: {product.title}</p>
                        <p>Estimated Current Inventory: {product.estimated_inventory}</p>
                        <p>Standard Size: {product.standard_size}</p>
                        <p>Unit: {product.unit}</p>
                        <p>Use Days: {product.use_days}</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => removeProduct(product.id)}>Remove</button>
                            <button onClick={handleEditModeToggle}>Edit</button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
