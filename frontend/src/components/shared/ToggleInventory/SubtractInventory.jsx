import { IoIosRemoveCircle } from 'react-icons/io';
import sharedStyles from "../../shared/styles.module.css"

import React from "react";

const SubtractInventory = ({ handleInventoryToggle, inventory }) => {
    return (
        <div style={{display:"flex", alignItems:"center"}} className={inventory < 1 ? sharedStyles.disabled: null}>
            <IoIosRemoveCircle size={30} onClick={inventory > 0 ? handleInventoryToggle : undefined} />
        </div>
    );
};

export default SubtractInventory;