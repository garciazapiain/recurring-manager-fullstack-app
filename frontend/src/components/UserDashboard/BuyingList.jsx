import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import sharedStyles from "../shared/styles.module.css";
import UpdateInventory from "./UpdateInventory.jsx";
import ProductDetails from "./ProductDetails.jsx";
import Slider from "./Slider.jsx"
import NoProductsModal from "./NoProductsModal.jsx";
import { UNIT_CHOICES } from "../shared/utils.jsx";
import { useAtom } from 'jotai';
import { darkModeAtom } from '../shared/DarkMode/darkModeAtom.js'; // Import the darkModeAtom

const BuyingList = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [remainingDaysThreshold, setRemainingDaysThreshold] = useState(props.lowestRemainingDay);
  const [viewProductsWithDaysThreshold, setViewProductsWithDaysThreshold] = useState(true)
  const [darkModeOn] = useAtom(darkModeAtom); // Access the state of darkModeAtom

  useEffect(() => {
    if (props.products.length) {
      setIsNoProductsModalOpen(false)
      if (viewProductsWithDaysThreshold) {
        setFilteredProducts(props.products.filter((product) => product.estimated_remaining_days <= remainingDaysThreshold));
      }
      else {
        setFilteredProducts(props.products)
      }
    }
    else if (props.products.length == 0) {
      setIsNoProductsModalOpen(true)
    }
  }, [props, remainingDaysThreshold, viewProductsWithDaysThreshold]);

  const handleThresholdChange = (event) => {
    const value = parseInt(event.target.value);
    setRemainingDaysThreshold(value);
  };

  const [isUpdateInventoryModalOpen, setIsUpdateInventoryModalOpen] = useState(false);

  const handleOpenModalUpdateInventory = () => {
    setIsUpdateInventoryModalOpen(true);
  };

  const handleCloseModalUpdateInventory = () => {
    setIsUpdateInventoryModalOpen(false);
  };

  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);
  const [productOpenInDetails, setProductOpenInDetails] = useState(null)
  const handleOpenModalProductDetails = (product) => {
    setIsProductDetailsModalOpen(true)
    setProductOpenInDetails(product)
  };
  const handleCloseModalProductDetails = () => {
    setIsProductDetailsModalOpen(false)
    setProductOpenInDetails(null)
  };
  const handleCloseModalNoProducts = () => {
    setIsNoProductsModalOpen(false)
  };

  const [isNoProductsModalOpen, setIsNoProductsModalOpen] = useState(false)
  const handleProductLibraryRedirect = () => {
    window.location.href = "/product-library/"
  }

  useEffect(() => {
    if (remainingDaysThreshold > 99) {
      setViewProductsWithDaysThreshold(false)
    }
    else {
      setViewProductsWithDaysThreshold(true)
    }
  }, [remainingDaysThreshold])

  function formatUnitLabel(unitLabel, estimatedInventory) {
    const unitChoice = UNIT_CHOICES.find((choice) => choice.value === unitLabel);
    if (unitChoice && estimatedInventory >= 2) {
      return unitChoice.valueMultiple;
    } else {
      // Default to the original unit label if not found in UNIT_CHOICES
      return unitLabel;
    }
  }

  return (
    <div>
      {isNoProductsModalOpen && (
        <NoProductsModal onClose={handleCloseModalNoProducts} />
      )}
      {isUpdateInventoryModalOpen && (
        <UpdateInventory products={filteredProducts} onClose={handleCloseModalUpdateInventory} />
      )}
      {isProductDetailsModalOpen && (
        <ProductDetails product={productOpenInDetails} onClose={handleCloseModalProductDetails} />
      )}
      <div>
        {viewProductsWithDaysThreshold ?
          <>
            <div className={styles.daysRemainingContainer}>
              <input
                type="number"
                value={remainingDaysThreshold}
                onChange={handleThresholdChange}
                className={styles.daysRemainingVariable}
              />
              <p>days of stock remaining for these products:</p>
            </div>
            <Slider remainingDaysThreshold={remainingDaysThreshold} setRemainingDaysThreshold={setRemainingDaysThreshold} />
          </>
          :
          <>
            <div className={styles.daysRemainingContainer}>
              <p>Stock of all products:</p>
            </div>
            <Slider remainingDaysThreshold={remainingDaysThreshold} setRemainingDaysThreshold={setRemainingDaysThreshold} />
          </>
        }
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Estimated Inventory</th>
              <th>Remaining days</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr className={styles.productRow} onClick={() => handleOpenModalProductDetails(product)} key={product.id}>
                <td>{product.title}</td>
                <td><div className={styles.productGridContainer}><img className={styles.productImage} src={product.image} /></div></td>
                <td>{Math.round(product.estimated_inventory)} {formatUnitLabel(product.unit,product.estimated_inventory)}</td>
                <td>{product.estimated_remaining_days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.actionButtonSectionUserDashboard}>
        <button className={sharedStyles.primaryButton} onClick={handleOpenModalUpdateInventory}>Update Inventory</button>
        <button className={sharedStyles.primaryButton} onClick={handleProductLibraryRedirect}>Explore more products</button>
      </div>
    </div>
  );
};

export default BuyingList;
