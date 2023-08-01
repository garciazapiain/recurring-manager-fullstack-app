import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid.jsx";
import { IoIosArrowBack } from "react-icons/io"
import sharedStyles from "../shared/styles.module.css";

const ProductLibrary = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => (a. product_added_user ? 1 : b. product_added_user ? -1 : 0));
        setProducts(sortedData);
      });
  }, []);

  const handleUserDashboardRedirect = () => {
    window.location.href = "/"
  }

  return (
    <div>
      <IoIosArrowBack size={50} onClick={handleUserDashboardRedirect} />
      <h1 className={sharedStyles.pageHeadline}>Explore Products</h1>
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductLibrary;
