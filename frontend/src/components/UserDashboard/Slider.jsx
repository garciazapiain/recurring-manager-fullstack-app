import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";

const Slider = ({remainingDaysThreshold, setRemainingDaysThreshold}) => {
  const [sliderValue, setSliderValue] = useState(remainingDaysThreshold);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value)
    setRemainingDaysThreshold(event.target.value);
  };

  useEffect(()=>{
    setSliderValue(remainingDaysThreshold)
  },[remainingDaysThreshold])

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        onChange={handleSliderChange}
        className={styles.slider}
      />
    </div>
  );
};

export default Slider;