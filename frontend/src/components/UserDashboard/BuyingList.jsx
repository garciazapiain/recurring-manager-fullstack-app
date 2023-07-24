import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import sharedStyles from "../shared/styles.module.css";
import UpdateInventory from "./UpdateInventory.jsx";
import ProductDetails from "./ProductDetails.jsx";
import Slider from "./Slider.jsx"
import NoProductsModal from "./NoProductsModal.jsx";

const BuyingList = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [remainingDaysThreshold, setRemainingDaysThreshold] = useState(15);
  const [viewProductsWithDaysThreshhold, setViewProductsWithDaysThreshhold] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      sessionStorage.setItem("noProductsModalClosedInSession", "false");
    },3000)
  },[])

  useEffect(() => {
    if (props.products.length) {
      sessionStorage.setItem("noProductsModalClosedInSession", "true")
      setIsNoProductsModalOpen(false)
      if (viewProductsWithDaysThreshhold) {
        setFilteredProducts(props.products.filter((product) => product.estimated_remaining_days <= remainingDaysThreshold));
      }
      else {
        setFilteredProducts(props.products)

      }
    }
    else if(sessionStorage.getItem("noProductsModalClosedInSession")=="false" && props.products.length == 0) {
      setIsNoProductsModalOpen(true)
    }
  }, [props, remainingDaysThreshold, viewProductsWithDaysThreshhold]);

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
    sessionStorage.setItem("noProductsModalClosedInSession", "true");
  };

  const [isNoProductsModalOpen, setIsNoProductsModalOpen] = useState(false)
  const handleProductLibraryRedirect = () => {
    window.location.href = "/product-library/"
  }

  useEffect(()=>{
    if(remainingDaysThreshold>99){
      setViewProductsWithDaysThreshhold(false)
    }
    else{
      setViewProductsWithDaysThreshhold(true)
    }
  },[remainingDaysThreshold])

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
        {viewProductsWithDaysThreshhold ?
          <>
            <div className={styles.daysRemainingContainer}>
              <input
                type="number"
                value={remainingDaysThreshold}
                onChange={handleThresholdChange}
                className={styles.daysRemainingVariable}
              />
              <p>days of stock for these products:</p>
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
                <td> <img className={styles.productImage} src={product.image} /></td>
                <td>{product.estimated_inventory} {product.unit}</td>
                <td>{product.estimated_remaining_days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.actionButtonSectionUserDashboard}>
        <button className={sharedStyles.primaryButton} onClick={handleOpenModalUpdateInventory}>Update Inventory</button>
        <button className={sharedStyles.secondaryButton} onClick={handleProductLibraryRedirect}>Explore more products</button>
      </div>
    </div>
  );
};

export default BuyingList;
