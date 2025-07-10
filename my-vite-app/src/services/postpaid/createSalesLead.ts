import axios from "axios";

// Define response type
export interface SalesLeadCreationResponse {
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: string | null;
  errorShow: string | null;
  errorCode: string | null;
}

// API function
const createSalesLead = async (
  telephoneNo: string,
  firstName: string,
  lastName: string,
  nic: string,
  contactTelNo: string,
  selectedItems: string[],  
  selectedItem: string     
): Promise<SalesLeadCreationResponse | null> => {
  try {
    const token = localStorage.getItem("accessToken"); 
    if (!token) {
      console.error("Error: Access token is missing.");
      return null;
    }

    // Concatenate selectedItems and selectedItem into description
    const description = [...selectedItems, selectedItem].join(", "); 

    const url = `https://omnitest.slt.com.lk/api/Sales/SalesLeadCreationRequest?telephoneNo=${telephoneNo}&firstName=${firstName}&lastName=${lastName}&nic=${nic}&ConatctTelNo=${contactTelNo}&description=${encodeURIComponent(description)}`;

    console.log("Creating Sales Lead with URL:", url);

    // Make the API call
    const response = await axios.post<SalesLeadCreationResponse>(
      url,
      {}, // Empty body as the data is passed via URL parameters
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Success Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        const apiErrorData = error.response.data as SalesLeadCreationResponse;
        return apiErrorData; // Return error response if available
      } else {
        console.error("No response received from API:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // Return null for unexpected errors
  }
};


export default createSalesLead;
