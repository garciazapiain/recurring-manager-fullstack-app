import React, { useEffect, useState } from "react";
import BuyingList from "./BuyingList.jsx";
import sharedStyles from "../shared/styles.module.css";
import { useAtom } from 'jotai';
import { darkModeAtom } from '../shared/DarkMode/darkModeAtom.js'; // Import the darkModeAtom

const UserDashboard = () => {
  const [darkModeOn] = useAtom(darkModeAtom); // Access the state of darkModeAtom
  const [products, setProducts] = useState([]);
  const [lowestRemainingDay, setLowestRemainingDay] = useState(null);
  useEffect(() => {
    // Fetch the data from the API endpoint
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/userproducts/`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the products based on the 'added' property
        const filteredProducts = data.filter((product) => product.added);
        setProducts(filteredProducts);
        let lowestDays = 100
        for (const product of filteredProducts) {
          if (product.estimated_remaining_days < lowestDays) {
            lowestDays = product.estimated_remaining_days;
          }
        }
        setLowestRemainingDay(lowestDays);
      });
  }, []);

  return (
    <div style={{"padding":"1rem"}}>
      <h1 className={sharedStyles.pageHeadline}>My inventory</h1>
      {lowestRemainingDay == null ? (
        <></>
      ) : (
        <BuyingList products={products} lowestRemainingDay={lowestRemainingDay} />
      )}
    </div>
  );
};

export default UserDashboard;
