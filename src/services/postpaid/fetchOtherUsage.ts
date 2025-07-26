import axios from 'axios';
import {PostpaidUsageDetails} from '../../types/types';


const fetchOtherPackageUsage = async (subscriberID: string,usageType:string): Promise<PostpaidUsageDetails | null> => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`https://omnitest.slt.com.lk/api/BBVAS/${usageType}?subscriberID=${subscriberID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.isSuccess && response.data.dataBundle) {
      // Directly return the dataBundle typed with your interface
      console.log(response.data.dataBundle);
      return response.data.dataBundle as PostpaidUsageDetails;
    } else {
      console.error("Failed to fetch service details");
      return null;
    }

  } catch (error) {
    console.error(`Error fetching service detail for ${subscriberID}:`, error);
    return null; // Handle error appropriately (e.g., return null or throw an error)
  }
};

export default fetchOtherPackageUsage;