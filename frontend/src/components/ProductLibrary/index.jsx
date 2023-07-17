import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid.jsx";

const ProductLibrary = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  console.log(products)

  return (
    <div>
      <h1>Explore Products</h1>
      <ProductsGrid products={products}/>
    </div>
  );
};

export default ProductLibrary;
