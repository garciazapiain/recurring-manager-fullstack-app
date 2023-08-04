import { GrAddCircle } from 'react-icons/gr';

import React from "react";

const AddInventory = ({handleInventoryToggle}) => {
    
  return (
    <GrAddCircle onClick={handleInventoryToggle}/>
  );
};

export default AddInventory;