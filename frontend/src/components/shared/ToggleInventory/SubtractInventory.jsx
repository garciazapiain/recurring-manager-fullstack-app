import { GrSubtractCircle } from 'react-icons/gr';
import sharedStyles from "../../shared/styles.module.css"

import React from "react";

const SubtractInventory = ({ handleInventoryToggle, inventory }) => {

    return (
        <div className={inventory == 0 ? sharedStyles.disabled: null}>
            <GrSubtractCircle onClick={inventory !== 0 ? handleInventoryToggle : undefined} />
        </div>
    );
};

export default SubtractInventory;