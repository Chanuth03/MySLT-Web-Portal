import axios from 'axios';
import { CreateFaultResponse } from '../types/types';

const createFaultRequest = async (
    serviceID: string,
    faultyTelephoneNo: string,
    serviceOption: string,
    contactNo: string,
    faultDescription: string,
    status: string
  ): Promise<CreateFaultResponse | null> => {
    try {
      console.log("API Parameters (Before Payload):", {
        serviceID,
        faultyTelephoneNo,
        serviceOption,
        contactNo,
        faultDescription,
        status,
      });
  
      const payload = {
        serviceID,
        faultyTelephoneNo,
        serviceOption,
        contactNo,
        faultdescription: faultDescription, // Match API property names
        natureOfFault: "99-OUT OF ORDER",
        testObservation: "BB Not working",
        availabiliyCheck: "",
        lattitude: "312323",
        longitude: "32313223",
        status,
      };
  
      console.log("Constructed Payload for API:", payload);
  
      const url = `https://omnitest.slt.com.lk/api/Fault/CreateFaultRequestV2`;
  
      const response = await axios.post<CreateFaultResponse>(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Raw API Response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error - Status:", error.response?.status);
        console.error("Axios Error - Response Data:", error.response?.data || "No response data");
  
        // Return error response data if available
        return error.response?.data as CreateFaultResponse || null;
      } else if (error instanceof Error) {
        console.error("Unexpected Error:", error.message);
      } else {
        console.error("Unknown Error Occurred:", error);
      }
      return null;
    }
  };
  
   

  

export default createFaultRequest;
