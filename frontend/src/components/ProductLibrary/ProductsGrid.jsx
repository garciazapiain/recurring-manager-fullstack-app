import React, { useState } from "react";
import AddProductToUser from "./AddProductToUser.jsx";

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
        <div className="products-grid">
            {isAddProductToUserModalOpen && (
                <AddProductToUser productToAdd={productToAdd} onClose={handleCloseModal} />
            )}
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <h3>{product.title}</h3>
                    <h3>author:{product.author}</h3>
                    {product.product_added_user ? (
                        <p>Added</p>
                    ) : (
                        <button onClick={() => handleOpenModal(product)}>Add</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
