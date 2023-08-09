import { IoIosRemoveCircle } from 'react-icons/io';
import sharedStyles from "../../shared/styles.module.css"

import React from "react";

const SubtractInventory = ({ handleInventoryToggle, inventory }) => {
    return (
        <div className={inventory < 1 ? sharedStyles.disabled: null}>
            <IoIosRemoveCircle onClick={inventory > 0 ? handleInventoryToggle : undefined} />
        </div>
    );
};

export default SubtractInventory;