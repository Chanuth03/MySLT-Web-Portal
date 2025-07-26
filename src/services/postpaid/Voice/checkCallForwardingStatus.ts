import axios from "axios";

const checkCallForwardingStatus = async (telephoneNo: string) => {
  try {
    console.log(`Checking call forwarding status for telephone number: ${telephoneNo}`);

    // Retrieve the token from local storage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

    // Construct the API URL with the provided telephone number
    const url = `https://omnitest.slt.com.lk/api/Voice/CheckCallForwardingStatus?telephoneNo=${telephoneNo}`;
    console.log("API URL:", url);

    // Make the GET request with the Authorization header
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    // Check if the response is successful and contains the expected data
    if (response.data.isSuccess) {
      return response.data.dataBundle; // Assuming dataBundle contains the required information
    } else {
      console.error("Failed to fetch call forwarding status:", response.data.errorMessage);
      return null;
    }
  } catch (error) {
    console.error(`Error checking call forwarding status for ${telephoneNo}:`, error);
    return null;
  }
};

export default checkCallForwardingStatus;
