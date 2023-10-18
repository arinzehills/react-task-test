import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};
let sdk = new MkdSDK();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const { user, token, role } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
        token,
        role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    // window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");
    if (token && role) {
      dispatch({
        type: "LOGIN",
        payload: { isAuthenticated: true, user, token, role },
      });
    }
  }, []);
  console.log("Auth Context: ", state);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
