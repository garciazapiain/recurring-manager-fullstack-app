import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid.jsx";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import sharedStyles from "../shared/styles.module.css";
import styles from "./styles.module.css";
import CategoryFiltering from "./CategoryFiltering.jsx";

const ProductLibrary = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [filteredByCategories, setFilteredByCategories] = useState([]); // State variable for checked categories

  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.product_added_user ? 1 : b.product_added_user ? -1 : 0
        );
        setProducts(sortedData);
        setFilteredProducts(sortedData)
      });
  }, []);

  const handleUserDashboardRedirect = () => {
    window.location.href = "/";
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // Filter by search query
    const filteredBySearch = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredByCategories.length === 0) {
      // If no categories are selected, use only the search filter
      setFilteredProducts(filteredBySearch);
    } else {
      // If categories are selected, apply category filtering as well
      setFilteredProducts(
        filteredBySearch.filter((product) =>
          filteredByCategories.some((category) => category.id === product.category)
        )
      );
    }
  }, [searchQuery, filteredByCategories]);

  return (
    <div style={{ "padding": "1rem" }}>
      <IoIosArrowBack size={50} onClick={handleUserDashboardRedirect} />
      <h1 className={sharedStyles.pageHeadline}>Explore Products</h1>

      {/* Search input */}
      <div className={styles.searchProductsContainer}>
        <IoIosSearch size={40}/>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search products..."
        />
      </div>

      <CategoryFiltering filteredByCategories={filteredByCategories} setFilteredByCategories={setFilteredByCategories} />

      <ProductsGrid products={filteredProducts} /> {/* Use the filtered products */}
    </div>
  );
};

export default ProductLibrary;
