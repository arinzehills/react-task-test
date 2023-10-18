import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

function LogoutButton() {
  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout clicked");
    authDispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-lime-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-lime-600"
    >
      <AiOutlineUser className="h-5 w-5" />
      Logout
    </button>
  );
}

export default LogoutButton;
