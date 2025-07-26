import axios from "axios";
import { ValidateDataGiftResponse } from "../../types/types";


const validateDataGiftSubscriber = async (
  subscriberID: string,
  receiver: string
): Promise<ValidateDataGiftResponse | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Error: Access token is missing.");
      return null;
    }

    const url = `https://omnitest.slt.com.lk/api/BBVAS/ValidateDataGiftSub?reciever=${receiver}&subscriberID=${subscriberID}`;

    console.log(`Validating data gift for Receiver: ${receiver}, Subscriber ID: ${subscriberID}`);

    const response = await axios.get<ValidateDataGiftResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API Success Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        console.error("API Error Status:", error.response.status);
        console.error("API Error Headers:", error.response.headers);

        const apiErrorData = error.response.data as ValidateDataGiftResponse;
        if (apiErrorData) {
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

export default validateDataGiftSubscriber;
