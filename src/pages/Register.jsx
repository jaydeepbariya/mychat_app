import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import registerImg from "../assets/images/signup_pic.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 m-auto p-8 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name <sup className="text-red-500">*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.fullName ? "border-red-500" : ""
              }`}
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs italic">
                Full name is required
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username <sup className="text-red-500">*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                Username is required
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email <sup className="text-red-500">*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
              {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: 6
              })}
            />
            <div
              className="absolute inset-y-0 top-6 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && <p className="text-red-500 text-xs italic">Password is required</p> }
            {errors.password && <p className="text-red-500 text-xs italic">Minimum 6 Characters</p>}
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required"
              })}
            />
            <div
              className="absolute inset-y-0 top-6 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                Confirm password required
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                Passwords Not Matching
              </p>
            )}
          </div>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
          >
            Register
          </button>

          <div className="mt-4 flex gap-2">
            <p>Already have an account? </p>
            <Link className="text-blue-500 hover:underline" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>

      <div className="w-1/3 m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Join Our Community!</h2>
        <p className="text-gray-600">
          Create an account and start connecting with others.
        </p>

        {/* Add your relevant picture here */}
        <img
          src={registerImg}
          alt="Register Image"
          className="mt-8 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Register;
