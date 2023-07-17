import React, { useEffect, useState } from "react";
import BuyingList from "./BuyingList.jsx";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch("http://127.0.0.1:8000/api/userproducts/")
      .then((response) => response.json())
      .then((data) => {
        // Filter the products based on the 'added' property
        const filteredProducts = data.filter((product) => product.added);
        setProducts(filteredProducts);
      });
  }, []);

  const handleProductLibrary = () => {
    window.location.href = "/product-library/"
  }

  return (
    <div>
      <h1>My Products</h1>
      <BuyingList products={products} />
      <button onClick={handleProductLibrary}>Explore more products</button>
    </div>
  );
};

export default UserDashboard;
