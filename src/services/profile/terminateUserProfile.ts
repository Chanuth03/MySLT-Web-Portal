import axios from "axios";

const terminateUserProfile = async () => {
  const token = localStorage.getItem("accessToken");  // Retrieve the access token from localStorage
  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await axios.post(
      "https://omnitest.slt.com.lk/api/Account/TerminateProfile", 
      null,  // No data required in the body for termination
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data) {
      console.log("Terminate Profile Response:", response.data);
      return response.data; // Return response data if successful
    } else {
      console.error("No data received from the Terminate Profile API");
    }
  } catch (error) {
    console.error("Error terminating profile:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response Data:", error.response?.data);
      console.error("Response Status:", error.response?.status);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};

export default terminateUserProfile;
