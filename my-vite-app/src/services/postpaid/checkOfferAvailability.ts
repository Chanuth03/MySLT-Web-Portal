import axios from 'axios';
import { OfferAvailabilityAPIResponse } from '../../types/types.ts';

const checkOfferAvailability = async (telephoneNo: string): Promise<OfferAvailabilityAPIResponse | null> => {
  try {
    console.log(`Checking offer availability for telephone number: ${telephoneNo}`);
    
    const token = localStorage.getItem('accessToken');
    
    // Use GET request and pass telephoneNo as a query parameter
    const response = await axios.get(`https://omnitest.slt.com.lk/api/TimelyPay/checkofferavaliability`, {
      params: { telephoneNo },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`Offer Availability for ${telephoneNo}:`, response.data);

    // Log the entire response body
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));

    // Check if the API response contains a valid 'isSuccess' flag and data
    if (response.data.isSuccess && Array.isArray(response.data.dataBundle)) {
      console.log("Valid promotions data found:");
      // Log each promotion's details
      // response.data.dataBundle.forEach((promo: any, index: number) => {
      // /*  console.log(`Promotion ${index + 1}:`);
      //   console.log(`Telephoneno: ${promo.telephoneno}`);
      //   console.log(`Package Name: ${promo.packageName}`);
      //   console.log(`Amount: ${promo.amount}`);
      //   console.log(`Eligible Date: ${promo.eligibledate}`);
      //   console.log(`Expire Date: ${promo.expiredate}`);
      //   console.log(`Image URL: ${promo.imageURL}`);*/
      // });

      return response.data.dataBundle;  // Return only the dataBundle array
    } else {
      console.error("No valid promotions data found");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching offer availability for ${telephoneNo}:`, error);
    return null;
  }
};

export default checkOfferAvailability;
