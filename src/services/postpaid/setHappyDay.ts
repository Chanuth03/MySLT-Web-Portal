import axios from "axios";
import { HappyDayResponse } from "../../types/types";



// API function
const setHappyDay = async (
  subscriberID: string,
  happyDate: string,
  channel: string = "SCP", 
  commitUser: string = "user"
): Promise<HappyDayResponse | null> => {
  try {
    const token = localStorage.getItem("accessToken"); 
    if (!token) {
      console.error("Error: Access token is missing.");
      return null;
    }

    
    const url = `https://omnitest.slt.com.lk/api/BBVAS/HappyDay?subscriberID=${subscriberID}&happydate=${happyDate}&channel=${channel}&commituser=${commitUser}`;

    console.log(`Setting Happy Day for Subscriber: ${subscriberID}, Date: ${happyDate}`);

   
    const response = await axios.post<HappyDayResponse>(url, {}, { // Empty body as params are in the URL
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API Success Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        console.error("API Error Status:", error.response.status);
        console.error("API Error Headers:", error.response.headers);

        const apiErrorData = error.response.data as HappyDayResponse;
        if (apiErrorData) {
          console.log("Parsed Error Response:", apiErrorData);
        } else {
          console.warn("Unexpected error response structure:", error.response.data);
        }

        return apiErrorData; // Return error data if available
      } else {
        console.error("No response received from API:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // Return null for unexpected errors
  }
};

export default setHappyDay;
