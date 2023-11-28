const User = require("../model/User");
const sendMail = require("../util/sendEmail");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../model/Otp");
const AdditionalInformation = require("../model/AdditionalInfo");
const sendEmail = require("../util/sendEmail");


exports.sendotp = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      lowerCase: false,
    });

    const response = await sendMail(email, "Verify Your Email | MyChat", `Your OTP is : ${otp}`);

    console.log("Email Sending Response ", response);

    const otpSaved = await Otp.create({ otp });

    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully.", "otp": otpSaved.otp });

  } catch (error) {
    console.error("Error in sending otp : ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res) => {
    try {
        const { email, password, username, otp } = req.body;
        
        if (!email || !password || !username || !otp) {
          return res.status(400).json({ success: false, message: 'All fields required' });
        }
    
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ success: false, message: 'User already exists.' });
        }
    
        const otpData = await Otp.findOne({ email, otp });
        
        if( otpData?.expiresAt < Date.now()){
          return res.status(400).json({ success: false, message: "OTP Expired" });
        }

        if (!otpData) {
          return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const additionalInformation = await AdditionalInformation.create({ bio:"", location:"", mobileNumber:"", gender:"" });

        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
          followers: [],
          following: [],
          posts: [],
          displayPicture: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
          additionalInformation: additionalInformation._id
        });
    
        return res.status(200).json({ success: true, message: 'User registered successfully.', user: newUser });

      } catch (error) {
        console.error('Error in Register :', error);
        return res.status(500).json({ success: false, message: error.message });
      }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ){
      return res.status(400).json({ success: true, message: "Email and Password Required" });
    }

    const user = await User.findOne({email});

    if( !user ){
      return res.status(400).json({ success: true, message: "No User with this email" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    const payload = {
      id: user._id,
      email: user.email, 
      username: user.username
    };

    let token;

    if( matchPassword ){
      token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:"1h" });
    }

    user.token = token;
    user.password = undefined;

    return res.status(200).json({ success: true, message: "Logged In Successfully" , token, user});

  } catch (error) {
    console.log("Login Error ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if( !email ){
      return res.status(400).json({ success: true, message: "Email Required" });
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({ success: false, message: "No User with this email" });
    }

    const token = crypto.randomUUID().toString();

    const response = await sendEmail(email, "Reset Password | MyChat App", `Click on This link : http://localhost:3000/reset-password/${token}`);

    const updatedUser = await User.findOneAndUpdate({ email }, { resetPasswordToken: token }, { new: true });

    return res.status(200).json({ success: true, message: "Reset Password Link Sent Successfully", token});

  } catch (error) {
    console.log("Forgot Password Error ", error.message);
    return res.status(500).json({success: false, message: error.message});
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if( !token || !newPassword ) {
      return res.status(400).json({ success: false, message: "Token and New Password Required" });
    }

    const user = await User.findOne({ resetPasswordToken: token });

    if( user.resetPasswordTokenExpires < Date.now() ){
      return res.status(400).json({ success: false, message: "Token Expired" });
    }

    if( user.resetPasswordToken !== token ){
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.updateOne({ password: hashedPassword });

    await user.save();

    return res.status(200).json({ success: true, message: "Password Changed Successfully", user });

  } catch (error) {
    console.log("Reset Password Error ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    
    const { oldPassword, newPassword } = req.body;
    const {email} = req.user;

    if( !oldPassword || !newPassword ){
      return res.status(400).json({ success: false, message: "Old and New Password Required" });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate({ email }, { password: hashNewPassword }, { new: true });

    return res.status(200).json({ success: true, message: "Password Changed Successfully" });

  } catch (error) {
    console.log("Change Password Error ", error.message);
    return res.status(500).json({ success: true, message: error.message });
  }
};
