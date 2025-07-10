import axios from "axios";

const updateUserInfo = async (userName: string, altrContact: string, name: string) => {
  // Ensure userName is not null before making the API request
  if (!userName) {
    console.error("User name is required");
    return;
  }

  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    console.log("Calling Update User Info API with parameters:", { userName, altrContact, name });

    const response = await axios.post(
      'https://omnitest.slt.com.lk/api/Account/UpdateUserInfo',
      new URLSearchParams({
        userName: userName,
        altrContact: altrContact,
        name: name
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );

    if (response.data) {
      console.log("Update User Info Response:", response.data);
      return response.data;
    } else {
      console.error("No data received from the Update User Info API");
    }
  } catch (error) {
    console.error("Error updating user info:", error);

    if (axios.isAxiosError(error)) {
      console.error('Response Data:', error.response?.data);
      console.error('Response Status:', error.response?.status);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
};

export default updateUserInfo;
