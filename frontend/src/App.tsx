import React from 'react';
// @ts-ignore
import LibraryProducts from './components/LibraryProducts/index.tsx';
// @ts-ignore
import NavBar from './components/NavBar/NavBar.tsx';
import './index.css';

function App() {
  return (
    <>
      <div className="App">
        <LibraryProducts /> 
      </div>
    </>
  );
}

export default App;