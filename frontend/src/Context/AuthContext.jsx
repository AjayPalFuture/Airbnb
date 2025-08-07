import React,{createContext} from 'react'

export const authDataContext =createContext();
function AuthContext({children}) {
    let serverUrl = "http://localhost:1000";
   let value = {
        serverUrl
    }
  // console.log(value);
  // console.log(children);
  // console.log(authData
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
            </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
