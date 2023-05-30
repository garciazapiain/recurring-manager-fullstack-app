import React, { useEffect, useState } from 'react';
// @ts-ignore
import LibraryProducts from './components/LibraryProducts/index.tsx';
// @ts-ignore
import './index.css';
// @ts-ignore
import AuthContext from './AuthContext.js';

function App() {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState("")

  useEffect(() => {
    const env = window.location.hostname;
    let apiUrl;

    if (env === "localhost") {
      apiUrl = "http://127.0.0.1:8000/api/auth/user/";
      setPath('http://127.0.0.1:8000')
    } else {
      // Update the URL to the appropriate endpoint for your production environment
      apiUrl = "https://recurring-manager-app.herokuapp.com/api/auth/user/";
      setPath('https://recurring-manager-app.herokuapp.com')
    }
    fetch(apiUrl, {
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);
  return (
    <>
      <AuthContext.Provider value={{user, path}}>
        <div className="App">
          <LibraryProducts />
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;