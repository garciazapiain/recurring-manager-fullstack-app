import React, { useEffect, useState } from "react";
import BuyingList from "./BuyingList.jsx";
import sharedStyles from "../shared/styles.module.css";

const UserDashboard = () => {
  window.location.reload
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/userproducts/`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the products based on the 'added' property
        const filteredProducts = data.filter((product) => product.added);
        setProducts(filteredProducts);
      });
  }, []);

  return (
    <div>
      <h1 className={sharedStyles.pageHeadline}>My inventory</h1>
      <BuyingList products={products} />
    </div>
  );
};

export default UserDashboard;
