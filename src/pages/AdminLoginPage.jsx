import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";

const AdminLoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // setError,
    // error,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    //TODO
    setLoading(true);
    var res = await sdk.login(data.email, data.password, "admin");
    console.log("res");
    console.log(res.error);
    if (res.error) {
      setError(res.message);
    } else {
      authDispatch({ type: "LOGIN", payload: res });
      navigate("/admin/dashboard");
      showToast(dispatch, res.message ?? "Logged in successfully!");
    }
    setLoading(false);
    // console.log(error);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value={loading ? "Signing in..." : "Sign In"}
          />
        </div>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default AdminLoginPage;
