import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginPic from "../assets/images/login_pic.png";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-11/12 mx-auto flex h-screen bg-gray-100">
      <div className="w-2/3 m-auto p-8 max-w-md">
        <h2 className="text-3xl font-bold my-4 text-navyBlue">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email <sup className="text-red-600">*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <div>
                <p className="text-red-500 text-xs italic">Email Required</p>
                <p className="text-red-500 text-xs italic">Invalid Email</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <div>
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
                <p className="text-red-500 text-xs italic">
                  Password length must be greater than 6 characters
                </p>
              </div>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            type="submit"
          >
            Login
          </button>

          <div className="mt-4 flex gap-2">
            <p>Don't have an account? </p>
            <Link className="text-blue-500 hover:underline" to="/register">
              Register
            </Link>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              className="text-blue-500 hover:underline"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>

      <div className="m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-gray-600">
          Login to access your account and connect with friends.
        </p>

        <img
          src={loginPic}
          alt="Login Image"
          className="mt-8 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default LoginPage;
