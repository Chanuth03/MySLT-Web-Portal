import axios from "axios";

const fetchTransactionHistory = async (serviceId: string, fromDate: string, toDate: string) => {
    const token = localStorage.getItem("accessToken");

   console.log(`Fetching transaction history for ashen serviceId: ${serviceId}, fromDate: ${fromDate}, toDate: ${toDate}`);

    try {
        const response = await axios.get(
            `https://omnitest.slt.com.lk/api/LTEPrepaid/viewTransactionsHistory?fromDate=${fromDate}&toDate=${toDate}&LTESLTNumber=${serviceId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

    
        //console.log(`Transaction History Detail for ${serviceId}:`, response.data);

        if (response.data && Array.isArray(response.data.dataBundle)) {
            return response.data.dataBundle; 
        } else {
            console.error("Failed to fetch transaction history or data not found.");
            return null;
        }
    } catch (error) {
        console.error(`Error fetching transaction history for serviceId ${serviceId}:`, error);
        return null;
    }
};

export default fetchTransactionHistory;
