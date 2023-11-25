import React, { useState } from "react";
import OTPInput from "react-otp-input";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const handleOtp = () =>{
    console.log(otp);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            OTP <sup className="text-red-500">*</sup>
          </label>
          <OTPInput
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="otp"
            name="otp"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={{color:"black", padding:"auto 30px"}}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          type="submit"
          onClick={handleOtp}
        >
          Verify Email
        </button>
      </div>

      <div className="m-auto p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-600">
          Add the OTP sent to your email to become a valuable member of the
          community with registration after verification.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
