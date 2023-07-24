import React, { useState } from "react";
import AddProductToUser from "./AddProductToUser.jsx";
import styles from "./styles.module.css";
import { GrAddCircle, GrCheckmark } from "react-icons/gr"

const ProductsGrid = ({ products }) => {
    const [isAddProductToUserModalOpen, setAddProductToUserModalOpen] = useState(false);
    const [productToAdd, setProductToAdd] = useState(null)

    const handleOpenModal = (product) => {
        setProductToAdd(product)
        setAddProductToUserModalOpen(true);
    };

    const handleCloseModal = () => {
        setProductToAdd(null)
        setAddProductToUserModalOpen(false);
    };

    return (
        <div className={styles.productGrid}>
            {isAddProductToUserModalOpen && (
                <AddProductToUser productToAdd={productToAdd} onClose={handleCloseModal} />
            )}
            {products.map((product) => (
                <div key={product.id} className={styles.productItem}>
                    <div className={styles.productGridAddOrAdded}>
                        {product.product_added_user ? (
                            <GrCheckmark color="blue" size={20} />
                        ) : (
                            <GrAddCircle size={20} onClick={() => handleOpenModal(product)} />
                        )}
                    </div>
                    <div className={styles.productGridImage}>
                        <img src={product.image}></img>
                    </div>
                    <h3>{product.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
