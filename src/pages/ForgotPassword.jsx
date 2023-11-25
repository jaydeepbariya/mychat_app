import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 m-auto p-8 max-w-md">
        <h2 className="text-3xl font-bold my-4 text-navyBlue">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email <sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.required}</p>}
            {errors.email && <p className="text-red-500 text-xs italic">Invalid Email</p>}
          </div>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isSubmitting}
          >
            Send Reset Link
          </button>

          <div className="mt-4">
            <Link className="flex items-center text-blue-500 hover:underline" to="/login">
              <AiOutlineArrowLeft className="mr-2" /> Back to Login
            </Link>
          </div>
        </form>
      </div>

      <div className="w-1/3 m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Your Password?</h2>
        <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
