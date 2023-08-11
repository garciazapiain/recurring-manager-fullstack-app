import React from 'react';
import sharedStyles from "../shared/styles.module.css"

const NoProductsModal = ({ onClose }) => {
    const handleProductLibraryRedirect = () => {
        window.location.href = "/product-library/"
    }

    return (
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContentSmall}>
                <div className={sharedStyles.modalContentHeader}>
                    <h3>You have no products saved</h3>
                </div>
                <div className={sharedStyles.modalActions}>
                    <button onClick={handleProductLibraryRedirect} className={sharedStyles.primaryButton}>Explore products</button>
                </div>
            </div>
        </div>
    );
};

export default NoProductsModal;