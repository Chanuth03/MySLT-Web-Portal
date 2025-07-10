// src/services/fetchLTEPrepaidPackages.ts
import axios from 'axios';
import { BroadbandPrepaidAddOnPackageDetails } from '../../types/types';

export const fetchLTEPrepaidAddOnPackages = async (): Promise<BroadbandPrepaidAddOnPackageDetails[]> => {
  try {
    const response = await axios.get(
      'https://omnitest.slt.com.lk/api/LTEPrepaid/LTEPrepaidPackageList?packageType=Add-ons', // Changed to GET
      {
        params: {
          packageType: 'Add ons', // Pass packageType as a query parameter
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json', // Use appropriate content type
        },
      }
    );

    console.log("Response:", response.data);
    return response.data.dataBundle.data as BroadbandPrepaidAddOnPackageDetails[]; // Return the response data
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error; // Rethrow the error to handle it later
  }
};
