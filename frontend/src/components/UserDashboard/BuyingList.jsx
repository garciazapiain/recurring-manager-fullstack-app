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
    console.log(id)
    let csrfToken
    const cookies = document.cookie.split('; ');
    const csrfCookie = cookies.find((cookie) => cookie.startsWith('csrftoken='));
    if (csrfCookie) {
        csrfToken = csrfCookie.split('=')[1];
        console.log(csrfToken);
    } else {
        console.log('CSRF token cookie not found');
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/toggle-added/`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken, // Replace 'csrftoken' with the name of your CSRF cookie
      },
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
      .then(data => {
        console.log(`Product ${id} inventory removed successfully:`, data);
        window.location.reload();
      })
      .catch(error => {
        console.error(`Error updating product ${id} inventory:`, error);
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
                <td onClick={()=>removeProduct(product.id)}>remove</td>
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
