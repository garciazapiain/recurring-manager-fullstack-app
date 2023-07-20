import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid.jsx";

const ProductLibrary = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <h1>Explore Products</h1>
      <ProductsGrid products={products}/>
    </div>
  );
};

export default ProductLibrary;
