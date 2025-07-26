import axios from 'axios';
import { BillHistoryAPIResponse, BillHistoryDetail } from '../../types/types';

const fetchBillingHistory = async (telephoneNo: string, accountNo: string): Promise<BillHistoryDetail[] | null> => {
  // Log the incoming parameters
  console.log(`Fetching billing history for Telephone No: ${telephoneNo}, Account No: ${accountNo}`);
  
  try {
    const token = localStorage.getItem('accessToken');
    
    // Make GET request to fetch billing history
    const response = await axios.get<BillHistoryAPIResponse>(
      `https://omnitest.slt.com.lk/api/AccountOMNI/BillHistoryRequestV2`, 
      {
        params: {
          telephoneNo: telephoneNo,
          accountNo: accountNo,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Print the full API response
    // console.log(`Full API response for Bill Hostory ${telephoneNo}:`, JSON.stringify(response.data, null, 2));

    if (response.data.isSuccess && response.data.dataBundle) {
      // Return the list of billing history details
      return response.data.dataBundle;
    } else {
      console.error("Failed to fetch billing history");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching billing history for ${telephoneNo}:`, error);
    return null;
  }
};

export default fetchBillingHistory;