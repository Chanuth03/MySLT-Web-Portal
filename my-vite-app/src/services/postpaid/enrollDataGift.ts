import axios from "axios";

const enrollDataGift = async (subscriberID: string, receiver: string, packageId: number, channel: string): Promise<any | null> => {
  try {
    const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

    const url = `https:///omnitest.slt.com.lk/api/BBVAS/DataGiftEnroll`;
    const response = await axios.get(url, {
      params: {
        subscriberID,
        reciever: receiver,
        packageId,
        channel
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Content-Type header
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    // Check and log the response
    if (response.status === 200) {
      console.log("API Response in enrollDataGift:", response.data);
      return response.data; // Return the response data
    } else {
      console.error("Error in enrollDataGift:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error in enrollDataGift:", error);
    return null; // Return null if there's an error
  }
};

export default enrollDataGift;
