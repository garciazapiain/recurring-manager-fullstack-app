import React, { useEffect, useState } from 'react';
// @ts-ignore
import LibraryProducts from './components/LibraryProducts/index.tsx';
// @ts-ignore
import './index.css';
// @ts-ignore
import AuthContext from './AuthContext.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://recurring-manager-app.herokuapp.com/api/auth/user/')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);
  return (
    <>
      <AuthContext.Provider value={user}>
        <div className="App">
          <LibraryProducts />
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;