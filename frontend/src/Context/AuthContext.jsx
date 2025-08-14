import React, { createContext, useState } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "http://localhost:1000";
  const[loading,setLoading]=useState(false)

  // userData ko manage karne ke liye state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  let value = {
    serverUrl,
    userData,
    setUserData,
    loading,
    setLoading
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
