import axios from "axios";
import { FaultDetailsAPIResponse } from "../types/types"; // Import the correct type

const getFaultList = async (telephoneNo: string): Promise<FaultDetailsAPIResponse | null> => {
    try {
        const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
        if (!token) {
          console.error("No access token found in localStorage");
          return null;
        }
    
        const url = `https://omnitest.slt.com.lk/api/Fault/ViewFaultList?faultyTelephoneNo=${telephoneNo}`;
        const response = await axios.get<FaultDetailsAPIResponse>(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
    
        if (response.data.isSuccess) {
            console.log("API Response in getFaultList:", response.data); // Log the response here for further debugging
          return response.data; // Return the parsed data if successful
        } else {
          console.error("Error fetching fault list:", response.data.errorMessage);
          return null;
        }
      } catch (error) {
        console.error("Error fetching fault list:", error);
        return null; // Return null if there's an error
      }
    };
    
    export default getFaultList;