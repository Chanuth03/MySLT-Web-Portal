import axios from 'axios';
import { OtpResponse } from '../../types/types';



// Function to register a user
export const registerUser = async (
  username: string,
  password: string,
  confirmPassword: string,
  name: string,
  userType: string
): Promise<OtpResponse> => {
  const url = 'https://omnitest.slt.com.lk/api/Account/RegisterV2';

  // Prepare the data to send in the request
  const payload = new URLSearchParams();
  payload.append('userName', username);
  payload.append('password', password);
  payload.append('confirmPassword', confirmPassword);
  payload.append('Name', name);
  payload.append('userType', userType);
  payload.append('fiebaseId', ''); // Ensure proper value if required
  payload.append('appVersion', '1.0.0'); // Replace with realistic version
  payload.append('osType', 'web'); // Replace with 'android', 'ios', or 'web'

  try {
    console.log('Payload:', Object.fromEntries(payload));

    // Send the request using axios
    const response = await axios.post<OtpResponse>(url, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('API Response:', response.data);

    // Return the API response
    return response.data;
  } catch (error) {
    console.error('Error during Register API call:', error);

    if (axios.isAxiosError(error)) {
      // Log the specific error response if available
      console.error('API error response:', error.response?.data);

      // Construct a meaningful error message
      throw new Error(
        `Register API failed: ${
          error.response?.data?.errorMessege || error.message
        }`
      );
    } else {
      throw new Error('Unexpected error occurred during Register API call');
    }
  }
};

export default registerUser;
