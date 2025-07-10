import axios from 'axios';
import { ServiceDetailsAPIResponse } from '../types/types.ts';

const fetchServiceDetailByTelephone = async (telephoneNo: string): Promise<ServiceDetailsAPIResponse | null> => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`https://omnitest.slt.com.lk/api/AccountOMNI/GetServiceDetailRequest?telephoneNo=${telephoneNo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Service Detail for ${telephoneNo}:`, response.data);

    if (response.data.isSuccess && response.data.dataBundle) {
      // Directly return the dataBundle typed with your interface
      return response.data.dataBundle as ServiceDetailsAPIResponse;
    } else {
      console.error("Failed to fetch service details");
      return null;
    }

  } catch (error) {
    console.error(`Error fetching service detail for ${telephoneNo}:`, error);
    return null; // Handle error appropriately (e.g., return null or throw an error)
  }
};

export default fetchServiceDetailByTelephone;
