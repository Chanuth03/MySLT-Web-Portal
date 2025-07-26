import axios from 'axios';
import { OtpVerificationResponse } from '../../types/types';



// Function to verify OTP
export const verifyOtp = async (
  verifyOtp: string,
  id: string,
  channelID: string = 'WEB'
): Promise<OtpVerificationResponse> => {
  try {
    const url = 'https://omnitest.slt.com.lk/api/Account/OTPAuthRequest';

    // Log the input data
    console.log('Sending data to API:');
    console.log('verifyOtp:', verifyOtp);
    console.log('id:', id);
    console.log('channelID:', channelID);

    // Prepare the data to send in the request
    const payload = new URLSearchParams();
    payload.append('verifyOtp', verifyOtp);
    payload.append('id', id);
    payload.append('channelID', channelID);

    // Send the request using axios
    const response = await axios.post<OtpVerificationResponse>(url, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Log the response data
    console.log('Received API response:');
    console.log('Response data:', response.data);

    // Return the API response
    return response.data;
  } catch (error) {
    console.error('Error during OTP Verification API call:', error);

    if (axios.isAxiosError(error)) {
      // Log the specific error response if available
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }

    // Throw a new error after logging the details
    throw new Error('OTP Verification API request failed');
  }
};

export default verifyOtp;
