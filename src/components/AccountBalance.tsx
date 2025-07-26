import React, { useEffect, useState } from "react";
import { parseTime } from "../services/helperFunctions"; // Adjust the import path as needed
import fetchBillingDetails from "../services/postpaid/fetchBillingDetails";
import fetchWalletDetail from "../services/prepaid/fetchWalletDetails";
import useStore from "../services/useAppStore";
import { useTranslation } from 'react-i18next';
import "./AccountBalance.css"; // You'll need to create this CSS file

// Define interfaces for type safety
interface ServiceDetails {
  promotionType?: string;
  accountNo?: string;
}

interface WalletDetails {
  amount?: number;
  expireTime?: string;
}

interface BillingInquiry {
  billAmount: string;
}

const AccountBalance: React.FC = () => {
  const { t } = useTranslation();
  const { serviceDetails, selectedTelephone, setLeftMenuItem } = useStore();
  const [amount, setAmount] = useState<string>("");
  const [_expireTime, setExpireTime] = useState<string>(""); // State for expire time
  const [billingAmount, setBillingAmount] = useState<string | null>(null); // State for billing amount
  const isPrepaid = (serviceDetails as ServiceDetails)?.promotionType === "Prepaid";

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // Fetch wallet details
      const walletDetails = await fetchWalletDetail(selectedTelephone) as WalletDetails;
      const amount = walletDetails?.amount ? walletDetails.amount / 100 : 0;
      const formattedAmount = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setAmount(formattedAmount);

      // Set expire time
      const walletExpireTime = walletDetails?.expireTime;
      const formattedTime = walletExpireTime ? parseTime(walletExpireTime) : null;
      const formattedExpireDate = formattedTime
        ? formattedTime.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "N/A";

      setExpireTime(formattedExpireDate);

      // Fetch billing details
      if (selectedTelephone && (serviceDetails as ServiceDetails)?.accountNo) {
        const billingInquiry = await fetchBillingDetails(
          selectedTelephone,
          (serviceDetails as ServiceDetails).accountNo as string
        ) as BillingInquiry[];
        
        if (billingInquiry && billingInquiry.length > 0) {
          // Set billing amount
          setBillingAmount(billingInquiry[0].billAmount);
        }
      }
    };

    fetchData();
  }, [selectedTelephone, serviceDetails]);

  const handleButtonClick = (): void => {
    if (isPrepaid) setLeftMenuItem("Transaction");
    else setLeftMenuItem("Bill");
  };

  return (
    <div className="account-balance-container">
      <div className="balance-info">
        <div className="balance-label">
          {isPrepaid ? t('accountBalance.balance') : t('accountBalance.totalPayable')}
        </div>
        {/* Commented out as in original
        <div className="expire-time">
          {isPrepaid ? "Expires on " : "For month Ending at "}
          <span className="expire-date">{expireTime}</span>
        </div> */}
        <div className="amount">
       {t('accountBalance.currency')}{isPrepaid ? amount : billingAmount || "0.00"}
      </div>
      </div>
      
      

      <div className="payment-actions">
      <button 
        className="action-button-1"
        onClick={handleButtonClick}
      >
         {isPrepaid ? t('menu.transaction') : t('accountBalance.payNow')}
      </button>
      
      <button 
        className="action-button-2"
        // onClick={handleButtonClick}
      >
        {t('accountBalance.billHistory')}
      </button>
      </div>
      
    </div>
  );
};

export default AccountBalance;