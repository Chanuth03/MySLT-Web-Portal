import axios from 'axios';
import {RedeemVoucherAPIResponse} from '../../types/types';



// Define the function to call the redeem voucher API
const redeemVoucher = async (subscriberID: string, voucherID: string): Promise<RedeemVoucherAPIResponse | null> => {
  try {
    console.log(`Redeeming voucher for Subscriber ID: ${subscriberID} and Voucher ID: ${voucherID}`);

    const token = localStorage.getItem('accessToken'); // Assuming you're using a token stored in localStorage

    // Construct the URL for the redeem voucher API with query parameters
    const url = `https://omnitest.slt.com.lk/api/BBVAS/RedeemVoucher?subscriberID=${subscriberID}&voucherid=${voucherID}&channel=SCP`;

    // Send POST request with the necessary headers
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`Redeem Voucher Response for ${voucherID}:`, response.data);

    // Handle success or failure based on the response structure
    if (response.data.isSuccess) {
      console.log('Voucher redeemed successfully:', response.data.dataBundle);
      return response.data;
    } else {
      // Handle error scenario
      console.error(`Error redeeming voucher: ${response.data.errorShow}`);
      return response.data; // Returning the error response
    }

  } catch (error) {
    console.error(`Error redeeming voucher for Subscriber ${subscriberID} and Voucher ${voucherID}:`, error);
    return null;
  }
};

export default redeemVoucher;
