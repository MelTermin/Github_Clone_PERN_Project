import React, { createContext, useContext, useEffect,useReducer } from "react";

const initialState = {
  user: null,
}


const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
      case "RESET_USER":
        return {
          ...state,
        };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  // action: get current user
  const getCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/current");
      const data= await response.json()
      console.log(data)

     
    } catch (err) {
      console.log(err);
      
    }
  };


  
  const value = {
    ...state,
    getCurrentUser,
   

  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}