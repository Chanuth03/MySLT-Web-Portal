import axios from 'axios';

const vasAccountRequest = async (vasUsername: string, userKey: string): Promise<any> => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  // Log the username and userkey to ensure they are correct
  console.log("VAS Username:", vasUsername);
  console.log("User Key:", userKey);

  try {
    const response = await axios.post(
      `https://omnitest.slt.com.lk/api/AccountOMNI/VASAccountRequest`,
      null, // For POST without a request body, use `null`
      {
        params: {
          vasusername: vasUsername,
          userkey: userKey,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token for authorization
        },
      }
    );

    if (response.status === 200) {
      console.log("VAS Account Request successful:", response.data);
      return response.data;
    } else {
      console.error("Failed to process VAS Account Request:", response);
    }
  } catch (error) {
    console.error("Error during VAS Account Request:", error);
  }
};

export default vasAccountRequest;
