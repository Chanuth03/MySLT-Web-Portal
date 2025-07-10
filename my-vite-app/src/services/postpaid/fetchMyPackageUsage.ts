import axios from 'axios';
import { PostpaidUsageDetails } from '../../types/types';

const fetchMyPackageUsage = async (subscriberID: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/BBVAS/UsageSummary?subscriberID=${subscriberID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.isSuccess && response.data.dataBundle) {
      const dataBundle = response.data.dataBundle;

      // Map the response to your PostpaidUsageDetails interface
      const mappedData: PostpaidUsageDetails = {
        status: dataBundle.status, // Mapping the status value
        package_summary: dataBundle.my_package_summary
          ? {
              limit: dataBundle.my_package_summary.limit,
              used: dataBundle.my_package_summary.used,
              volume_unit: dataBundle.my_package_summary.volume_unit,
            }
          : { limit: '0', used: '0', volume_unit: '' }, // Default to empty if no data
        usageDetails: dataBundle.my_package_info.usageDetails.map((usage: any) => ({
          name: usage.name,
          limit: usage.limit,
          remaining: usage.remaining,
          used: usage.used,
          percentage: usage.percentage,
          volume_unit: usage.volume_unit,
          expiry_date: usage.expiry_date,
        })),
      };

      return mappedData;
    } else {
      console.error('Failed to fetch service details');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching service detail for ${subscriberID}:`, error);
    return null; // Handle error appropriately (e.g., return null or throw an error)
  }
};

export default fetchMyPackageUsage;
