import axios from "axios";

const PromotionpackageActivation = async (
  telephoneno: string,
  packageid: number,
  referenceNo: number
): Promise<any | null> => {
  try {
    const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

    const url = `https://omnitest.slt.com.lk/api/TimelyPay/packageActivation`;

    const response = await axios.post(
      url,
      null, // No body since it's a POST request with parameters in the query string
      {
        params: {
          telephoneno,
          packageid,
          refrenceNo: referenceNo,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Content-Type header
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    // Check and log the response
    if (response.status === 200) {
      console.log("API Response in PromotionpackageActivation:", response.data);
      return response.data; // Return the response data
    } else {
      console.error("Error in PromotionpackageActivation:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error in PromotionpackageActivation:", error);
    return null; // Return null if there's an error
  }
};

export default PromotionpackageActivation;
