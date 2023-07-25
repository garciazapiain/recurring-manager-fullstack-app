import React, { useEffect, useState } from 'react';
import sharedStyles from "../shared/styles.module.css"
import { GiCancel } from 'react-icons/gi';

const NoProductsModal = ({ onClose }) => {
    const handleProductLibraryRedirect = () => {
        window.location.href = "/product-library/"
    }

    return (
        <div className={sharedStyles.modalOverlay}>
            <div className={sharedStyles.modalContentSmall}>
                <div className={sharedStyles.modalContentHeader}>
                    <h1>You have no products saved</h1>
                    <GiCancel size={30} onClick={onClose} />
                </div>
                <div className={sharedStyles.modalActions}>
                    <button onClick={handleProductLibraryRedirect} className={sharedStyles.primaryButton}>Explore products</button>
                </div>
            </div>
        </div>
    );
};

export default NoProductsModal;