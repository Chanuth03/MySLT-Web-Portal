import axios from "axios";
import { OtpResponse } from "../../types/types";

const verifyOTP = async (userName: string,newPassword:string, otp: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }
    const response = await axios.post(
      `https://omnitest.slt.com.lk/api/Account/ForgotPassword`,
      {
        verifyOtp: otp,
        newPassword: newPassword,
        userName: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.data.isSuccess) {
      console.log("password changed successfully");
      return response.data as OtpResponse;
    } else {
      console.error("Failed to send OTP", response.data.errorMessege);
      return null;
    }
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
};
export default verifyOTP;
