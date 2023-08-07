import React, { useState } from "react";
import AddProductToUser from "./AddProductToUser.jsx";
import styles from "./styles.module.css";
import sharedStyles from "../shared/styles.module.css";
import { IoIosAddCircle, IoIosCheckmarkCircle } from "react-icons/io"
import CreateProduct from "./CreateProduct.jsx";

const ProductsGrid = ({ products }) => {
    const [isAddProductToUserModalOpen, setAddProductToUserModalOpen] = useState(false);
    const [productToAdd, setProductToAdd] = useState(null)
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false)

    const handleOpenModal = (product) => {
        setProductToAdd(product)
        setAddProductToUserModalOpen(true);
    };

    const handleCloseModal = () => {
        setProductToAdd(null)
        setAddProductToUserModalOpen(false);
    };

    const handleCloseCreateProductModal = () => {
        setIsCreateProductModalOpen(false)
    };

    return (
        <>
            <div className={styles.productGrid}>
                {isCreateProductModalOpen && (
                    <CreateProduct onClose={handleCloseCreateProductModal} />
                )}
                {isAddProductToUserModalOpen && (
                    <AddProductToUser productToAdd={productToAdd} onClose={handleCloseModal} />
                )}
                {products.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                        <div className={styles.productGridAddOrAdded}>
                            {product.product_added_user ? (
                                <IoIosCheckmarkCircle color="rgb(71, 71, 219)" size={20} />
                            ) : (
                                <IoIosAddCircle size={20} onClick={() => handleOpenModal(product)} />
                            )}
                        </div>
                        <div className={styles.productGridImage}>
                            <img src={product.image}></img>
                        </div>
                        <h3>{product.title}</h3>
                    </div>
                ))}
            </div>
            <button className={sharedStyles.primaryButton} onClick={() => setIsCreateProductModalOpen(true)}>Create Product</button>
        </>
    );
};

export default ProductsGrid;
