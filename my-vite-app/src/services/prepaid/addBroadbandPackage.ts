import axios from "axios";

const addBroadbandPackage = async (
  telephoneNo: string,
  offeringId: string,
  offeringName: string
) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error("Access token not found");
    return;
  }
  console.log(token);
  try {
    const response = await axios.post(
      `https://omnitest.slt.com.lk/api/LTEPrepaid/LTEPrepaidAddDeleteOffer?LTESLTNumber=${telephoneNo}&productId=${offeringId}&offerName=${offeringName}&operationType=ADD_OFFERING&channelName=MY_SLT&channelSeq=3`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.isSuccess) {
      console.log(
        `Added broadband package... ${telephoneNo} ${offeringId} ${offeringName}`
      );
    }
  } catch (error) {
    console.error(`Error adding broadband package for ${telephoneNo}:`, error);
  }
};

export default addBroadbandPackage;
