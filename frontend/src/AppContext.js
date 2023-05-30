import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [locale, setLocale] = useState(null);

  useEffect(() => {
    if (window.location.hostname === 'recurring-manager-app.herokuapp.com') {
      setLocale('recurring-manager-app.herokuapp.com');
    } else {
      setLocale('http://127.0.0.1:8000/');
    }
  }, []);

  useEffect(() => {
    fetch(`${locale}/api/auth/user/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'iJXGyOlTlCzMWW6EvCW0vBDhC3I3ezMU',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // log the response data
        setUser(data);
      })
      .catch(error => {
        console.log(error); // log any errors
        setUser(null);
      });
  }, [locale]);

  const contextValue = { user, locale };

  console.log(contextValue)

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };