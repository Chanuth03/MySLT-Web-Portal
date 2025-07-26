import axios from 'axios';
import { dataBundle } from '../../types/types';

const fetchPackageDetails = async (serviceID: string, packageName: string): Promise<dataBundle[] | null> => {
  console.log(`Fetching Package Details for Service ID: ${serviceID}, Package Name: ${packageName}`);
  
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error("Access token is missing");
      return null;
    }
    
    const response = await axios.get<{ isSuccess: boolean; dataBundle: dataBundle[] }>(
      `https://omnitest.slt.com.lk/api/BBVAS/GetExtraGBPackages`, 
      {
        params: {
          serviceID,
          packageName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the entire response body
    console.log("API Response:", response.data);

    if (response.data.isSuccess && response.data.dataBundle) {
      return response.data.dataBundle;
    } else {
      console.error("Failed to fetch extra GB details");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching Package Details for ${serviceID}:`, error);
    return null;
  }
};

export default fetchPackageDetails;
