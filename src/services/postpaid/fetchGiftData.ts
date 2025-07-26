import axios from "axios";
import { GiftDataAPIResponse } from "../../types/types";

const fetchGiftData = async (
  subscriberID: string,
  receiver: string
): Promise<GiftDataAPIResponse | null> => {
  try {
    const packageId = "1";
    console.log(`Fetching gift data for Subscriber ID: ${subscriberID}, Receiver: ${receiver}`);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Error: Access token is missing.");
      return null;
    }

    const url = `https://omnitest.slt.com.lk/api/BBVAS/DataGiftEnroll?subscriberID=${subscriberID}&reciever=${receiver}&packageId=${packageId}&channel=SCP`;

   
    const response = await axios.post<GiftDataAPIResponse>(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",  
      },
    });

    // Log and return the success response
    console.log("API Success Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Log detailed error response
        console.error("API Error Response:", error.response.data);
        console.error("API Error Status:", error.response.status);
        console.error("API Error Headers:", error.response.headers);

        // Handling the error response
        const apiErrorData = error.response.data as GiftDataAPIResponse;
        if (apiErrorData && apiErrorData.dataBundle) {
          console.log("Parsed Error Response:", apiErrorData);
        } else {
          console.warn("Unexpected error response structure:", error.response.data);
        }

        return apiErrorData;
      } else {
        console.error("No response received from API:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export default fetchGiftData;
