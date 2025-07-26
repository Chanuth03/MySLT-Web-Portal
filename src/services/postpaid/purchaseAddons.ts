import axios from "axios";

const purchaseAddons = async (packageId: string, subscriberID: string, packageName: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }

    const url = `https://omnitest.slt.com.lk/api/BBVAS/AddVASDataBundlePostPaidV2?subscriberID=${subscriberID}&packageId=${packageId}&commitUser=MySLTWeb&channel=WEB`;

    const response = await axios.post(
      url,
      {}, // empty body since it's a POST with query parameters
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      if (response.data.isSuccess) {
        return {
          success: true,
          message: `Successfully activated ${packageName} Package`,
          data: response.data
        };
      } else {
        throw new Error(response.data.errorMessege || 'Failed to activate package');
      }
    } else {
      throw new Error('Failed to activate package');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

export default purchaseAddons;