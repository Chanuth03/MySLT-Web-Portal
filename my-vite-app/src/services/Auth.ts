import axios from "axios";

export const userLogin = async (
  event: React.FormEvent<HTMLFormElement>,
  userId: string,
  password: string
): Promise<{ success: boolean; data?: any }> => {
  event.preventDefault();

  const data = new URLSearchParams();
  data.append("channelID", "WEB");
  data.append("firebaseId", "");
  data.append("username", userId); // Append username to request
  data.append("password", password);

//   console.log("Data being sent:", data.toString());

  // Store the username in local storage
  localStorage.setItem("username", userId);
  const storedUsername = localStorage.getItem("username");
  console.log("Stored Username from Local Storage:", storedUsername); // Log stored username

  try {
    const response = await axios.post(
      "https://omnitest.slt.com.lk/api/Account/Login",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Response:", response.data);

    if (response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
     

      return { success: true, data: response.data }; // Return success and response data
    } else {
      alert("Invalid username or password.");
      return { success: false }; // Return failure if login fails
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during login:", error.response.data);
      alert(
        "Invalid username or password: " +
          (error.response.data.message || "Please try again.")
      );
    } else {
      console.error("Error during login:", error);
      alert("Invalid username or password.");
    }

    return { success: false }; // Return failure on error
  }
};
