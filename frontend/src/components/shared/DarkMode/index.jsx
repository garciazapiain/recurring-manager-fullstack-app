import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useAtom } from 'jotai';
import { darkModeAtom } from './darkModeAtom.js'; 

const DarkModeToggle = () => {
  const [darkModeOn, setDarkModeOn] = useAtom(darkModeAtom);

  const handleToggle = () => {
    setDarkModeOn((prevMode) => !prevMode);
  };

  return (
    <div onClick={handleToggle}>
      {darkModeOn ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
      {darkModeOn ? <BsToggleOn size={30} /> : <BsToggleOff size={30} />}
    </div>
  );
};

export default DarkModeToggle;
