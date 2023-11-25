import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const onSubmit = (data) => {
    // Handle reset password logic here
    console.log(data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 m-auto p-8 max-w-md">
        <h2 className="text-3xl font-bold my-4 text-navyBlue">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password <sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.newPassword ? 'border-red-500' : ''}`}
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              {...register('newPassword', { required: 'New Password is required', minLength: 6 })}
            />
            <div
              className="absolute inset-y-0 top-6 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
              {errors.newPassword && <p className="text-red-500 text-xs italic">Min length should be 6</p>}
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
              Confirm New Password <sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmNewPassword ? 'border-red-500' : ''}`}
              id="confirmNewPassword"
              type={showConfirmNewPassword ? 'text' : 'password'}
              placeholder="Confirm your new password"
              {...register('confirmNewPassword', { required: 'Confirm New Password is required'})}
            />
            <div
              className="absolute inset-y-0 top-6 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs italic">Min length should be 6</p>}
          </div>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isSubmitting}
          >
            Reset Password
          </button>

          <div className="mt-4">
            <Link className="flex items-center text-blue-500 hover:underline" to="/login">
              <AiOutlineArrowLeft className="mr-2" /> Back to Login
            </Link>
          </div>
        </form>
      </div>

      <div className="w-1/3 m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <p className="text-gray-600">You're just one step away from resetting your password. Fill in the form below to create a new password.</p>
      </div>
    </div>
  );
};

export default ResetPassword;
