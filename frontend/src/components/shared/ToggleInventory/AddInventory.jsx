import { IoIosAddCircle } from "react-icons/io"

import React from "react";

const AddInventory = ({handleInventoryToggle}) => {
    
  return (
    <IoIosAddCircle onClick={handleInventoryToggle}/>
  );
};

export default AddInventory;