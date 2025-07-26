// src/services/fetchLTEPrepaidPackages.ts
import axios from 'axios';
import { BroadbandPrepaidMainPackageDetails } from '../../types/types';

export const fetchLTEPrepaidMainPackages = async (): Promise<BroadbandPrepaidMainPackageDetails[]> => {
  try {
    const response = await axios.get(
      'https://omnitest.slt.com.lk/api/LTEPrepaid/LTEPrepaidPackageList?packageType=Main Packages',
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Response:", response.data);
    return response.data.dataBundle.data as BroadbandPrepaidMainPackageDetails[]; // Adjusted to return the correct data
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error; // Rethrow the error to handle it later
  }
};
