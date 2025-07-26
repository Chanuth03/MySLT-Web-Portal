import axios, { AxiosResponse } from "axios";

// Define the interface for the expected response
interface GetExtraGBActivateResponse {
  isSuccess: boolean;
  errorMessege: string;
  exceptionDetail?: string;
  dataBundle?: any;
  errorShow: string;
  message: string;
}

const activatepackagedetails = async (serviceID: string, packageId: any): Promise<GetExtraGBActivateResponse | null> => {
  try {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token is missing");
      // Return default error structure
      return { 
        isSuccess: false, 
        errorMessege: "Access token is missing", 
        errorShow: "Unknown error", // Default errorShow value
        message: "Action not completed" // Default message
      };
    }

    // Log the request parameters before making the API call
    console.log("Sending API request with parameters:", {
      subscriberID: serviceID,
      packageId: packageId,
      commitUser: "MySLTWeb",
      channel: "WEB",
    });

    // Make the API request
    const response: AxiosResponse = await axios.post(
      "https://omnitest.slt.com.lk/api/BBVAS/PurchaseExtraGBPostpaid",
      null, // No body payload for this POST request
      {
        params: {
          subscriberID: serviceID,
          packageId: packageId,
          commitUser: "MySLTWeb",
          channel: "WEB",
        },
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        },
      }
    );

    // Log the full API response for debugging
    console.log("Received API response:", response?.data);

    // Validate the response structure
    if (response?.data && typeof response.data === "object") {
      const { isSuccess, errorMessege, exceptionDetail, dataBundle, errorShow, message } = response.data;

      // Ensure the response contains isSuccess and map to the new interface
      if (typeof isSuccess === "boolean") {
        return { 
          isSuccess, 
          errorMessege, 
          exceptionDetail,
          errorShow: errorShow || "Unknown error",  // Default errorShow message if not provided
          dataBundle,
          message: message || "Action completed" // Default message if not provided
        };
      } else {
        console.error("Invalid response structure:", response.data);
        return { 
          isSuccess: false, 
          errorMessege: "Invalid response structure", 
          errorShow: "Unknown error", 
          message: "Action not completed" 
        };
      }
    }

    // If the response doesn't match expected structure, log the error and return the default structure
    console.error("Unexpected response format:", response);
    return { 
      isSuccess: false, 
      errorMessege: "Unexpected response format", 
      errorShow: "Unknown error", 
      message: "Action not completed" 
    };
  } catch (error: unknown) {
    console.error("Error in activating package details:", error);

    // Check if the error is an instance of Error to safely access its properties
    if (error instanceof Error) {
      return { 
        isSuccess: false, 
        errorMessege: error.message, 
        errorShow: "Unknown error", // Default errorShow value
        message: "Action not completed" // Default message
      };
    } else {
      return { 
        isSuccess: false, 
        errorMessege: "An unexpected error occurred", 
        errorShow: "Unknown error", 
        message: "Action not completed" 
      };
    }
  }
};

export default activatepackagedetails;
