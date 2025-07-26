import axios from "axios";

// Define the DownloadResponse type
type DownloadResponse = {
  base64: string;
  success: boolean;
};

const downloadBill = async ( eContact: string,accountNo: string, tpNo: string, ebillMonth: string): Promise<DownloadResponse> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return { base64: '', success: false }; // Return failure response
  }

  // Log the parameters to confirm if the data is coming correctly
  console.log("Preparing to download eBill with parameters:");
  console.log("eContact:", eContact);
  console.log("accountNo:", accountNo);
  console.log("ebillMonth:", ebillMonth);
  console.log("tpNo:", tpNo);

  try {
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/ebill/BillDownloadRequest?eContact=${eContact}&accountNo=${accountNo}&ebillMonth=${ebillMonth}&tpNo=${tpNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the response to check the structure
    console.log("API Response:", response.data.dataBundle); // Log the entire response to understand its structure

    if (response.data && response.data.base64) {
      const base64Data = response.data.databundle.dataBundle.base64; // Assuming this is the correct field
      console.log("Base64 Data: ", base64Data); // Log the base64 data for inspection

      // Clean the base64 data (remove any non-base64 characters like newlines or spaces)
      const cleanedBase64Data = base64Data.replace(/\s+/g, ''); // Remove spaces or newlines
      const byteCharacters = atob(cleanedBase64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      let totalLength = byteArrays.reduce((acc, byteArray) => acc + byteArray.length, 0);
      const flattenedByteArray = new Uint8Array(totalLength);

      let currentOffset = 0;
      for (let byteArray of byteArrays) {
        flattenedByteArray.set(byteArray, currentOffset);
        currentOffset += byteArray.length;
      }

      // Create a Blob from the byte array
      const blob = new Blob([flattenedByteArray], { type: "application/pdf" });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `eBill_${accountNo}_${ebillMonth}.pdf`; // File name
      link.click();

      return { base64: cleanedBase64Data, success: true }; // Return successful response
    } else {
      console.error("No base64 data received from the Bill Download API");
      return { base64: '', success: false }; // Return failure response
    }
  } catch (error) {
    console.error("Error downloading bill:", error);
    return { base64: '', success: false }; // Return failure response
  }
};

export default downloadBill;
