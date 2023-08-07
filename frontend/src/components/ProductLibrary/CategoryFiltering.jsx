import React, { useEffect, useState } from "react";

const CategoryFiltering = ({filteredByCategories, setFilteredByCategories}) => {
    const [categories, setCategories] = useState([]); // State variable to store fetched categories

    useEffect(() => {
        // Fetch categories from API endpoint
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productcategories/`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    // Function to handle category checkbox change
    const handleCategoryCheckboxChange = (categoryName) => {
        if (filteredByCategories.includes(categoryName)) {
          // If category name is already in the filtered list, remove it
          setFilteredByCategories((prevFilteredCategories) =>
            prevFilteredCategories.filter((category) => category !== categoryName)
          );
        } else {
          // If category name is not in the filtered list, add it
          setFilteredByCategories((prevFilteredCategories) => [
            ...prevFilteredCategories,
            categoryName,
          ]);
        }
      };

    return (
        <div>
            <h2>Filter by Categories:</h2>
            {categories.map((category) => (
                <div key={category.id}>
                    <input
                        type="checkbox"
                        id={category.id}
                        checked={filteredByCategories.includes(category)}
                        onChange={() => handleCategoryCheckboxChange(category)}
                    />
                    <label htmlFor={category.id}>{category.name}</label>
                </div>
            ))}
        </div>
    );
};

export default CategoryFiltering;
