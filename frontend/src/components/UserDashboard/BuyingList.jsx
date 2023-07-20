import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import UpdateInventory from "./UpdateInventory.jsx";

const BuyingList = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [remainingDaysThreshold, setRemainingDaysThreshold] = useState(15);
  const [viewProductsWithDaysThreshhold, setViewProductsWithDaysThreshhold] = useState(true)

  useEffect(() => {
    if (props.products.length) {
      if (viewProductsWithDaysThreshhold) {
        setFilteredProducts(props.products.filter((product) => product.estimated_remaining_days <= remainingDaysThreshold));
      }
      else {
        setFilteredProducts(props.products)

      }
    };
  }, [props, remainingDaysThreshold, viewProductsWithDaysThreshhold]);

  const handleThresholdChange = (event) => {
    const value = parseInt(event.target.value);
    setRemainingDaysThreshold(value);
  };

  const [isUpdateInventoryModalOpen, setIsUpdateInventoryModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsUpdateInventoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateInventoryModalOpen(false);
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
    <div>
      {isUpdateInventoryModalOpen && (
        <UpdateInventory products={filteredProducts} onClose={handleCloseModal} />
      )}
      <div>
        {viewProductsWithDaysThreshhold ?
          <>
            <label>Remaining Days Threshold:</label>
            <input
              type="number"
              value={remainingDaysThreshold}
              onChange={handleThresholdChange}
            />
            <button onClick={() => setViewProductsWithDaysThreshhold(false)}>All my products</button>
          </>
          :
          <>
            <label>All products</label>
            <button onClick={() => setViewProductsWithDaysThreshhold(true)}>Set by days</button>
          </>
        }
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Inventory</th>
              <th>Estimated Inventory</th>
              <th>Remaining days</th>
              <th>Added by user?</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.current_inventory} {product.unit}</td>
                <td>{product.estimated_inventory} {product.unit}</td>
                <td>{product.estimated_remaining_days}</td>
                <td>{product.added ? "true" : "false"}</td>
                <td onClick={() => removeProduct(product.id)}>remove</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleOpenModal}>Update Inventory</button>
    </div>
  );
};

export default BuyingList;
