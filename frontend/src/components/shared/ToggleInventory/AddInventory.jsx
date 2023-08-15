import { IoIosAddCircle } from "react-icons/io"

import React from "react";

const AddInventory = ({ handleInventoryToggle }) => {

  return (
    <div style={{display:"flex", alignItems:"center"}}>
      <IoIosAddCircle size={30} onClick={handleInventoryToggle} />
    </div>
  );
};

export default AddInventory;