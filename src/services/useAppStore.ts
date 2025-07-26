import { create } from "zustand";
import { DailyUsageDetails, OtpGlobalState, ServiceDetailsAPIResponse } from "../types/types";
import fetchServiceDetailByTelephone from "./fetchServiceDetails";

interface AppState {
  selectedTelephone: string;
  selectedAccountNo: string;
  selectedNavbarItem: string;
  selectedLeftMenuItem: string;
  serviceDetails: ServiceDetailsAPIResponse | null;
  packageName: string | null;
  packageListUpdate: number;
  selectedQuickAccessItem: string;
  otpState: OtpGlobalState | null;
  billMethodDataBundle: any | null;
  logingEmail: string;
  useeBillstatusEmail: string;
  usageDetails: DailyUsageDetails | null;
  detailReportAvailability: boolean;
  giftDataMobileNumber: string | null; // New state for mobile number
  setSelectedTelephone: (telephoneNo: string) => void;
  setSelectedAccountNo: (accountNo: string) => void;
  fetchServiceDetails: (telephoneNo: string) => Promise<void>;
  setSelectedNavbarItem: (item: string) => void;
  setLeftMenuItem: (item: string) => void;
  setSelectedQuickAccessItem: (item: string) => void;
  setPackageListUpdate: () => void;
  setOtpState: (item: OtpGlobalState) => void;
  setBillMethodDataBundle: (dataBundle: any) => void;
  setLogingEmail: (email: string) => void;
  setUseeBillstatusEmail: (email: string) => void;
  setPackageName: (packageName: string | null) => void;
  setUsageDetails: (data: DailyUsageDetails) => void;
  setDetailReportAvailability: (availablity: boolean) => void;
  setGiftDataMobileNumber: (mobileNumber: string | null) => void; // New setter for mobile number
}

const useStore = create<AppState>((set) => ({
  selectedTelephone: "",
  selectedAccountNo: "",
  serviceDetails: null,
  selectedNavbarItem: "Broadband",
  selectedLeftMenuItem: "",
  selectedQuickAccessItem: "",
  packageListUpdate: 0,
  otpState: null,
  billMethodDataBundle: null,
  packageName: null,
  logingEmail: "",
  useeBillstatusEmail: "",
  usageDetails: null,
  detailReportAvailability: false,
  giftDataMobileNumber: null, // Initialize with null
  setSelectedTelephone: (telephoneNo) => {
    console.log('Selected telephone:', telephoneNo); // Added console log
    set({ selectedTelephone: telephoneNo });
  },
  setSelectedAccountNo: (accountNo) => set({ selectedAccountNo: accountNo }),
  fetchServiceDetails: async (telephoneNo) => {
    const response = await fetchServiceDetailByTelephone(telephoneNo);
    set({ serviceDetails: response });
    const packageName = response?.listofBBService[0]?.packageName || null;
    set({ packageName });
  },
  setSelectedNavbarItem: (item) => set({ selectedNavbarItem: item }),
  setLeftMenuItem: (item) => set({ selectedLeftMenuItem: item }),
  setSelectedQuickAccessItem: (item) => set({ selectedQuickAccessItem: item }),
  setPackageListUpdate: () => set({ packageListUpdate: Math.random() }),
  setOtpState: (item) => set({ otpState: item }),
  setBillMethodDataBundle: (dataBundle) => set({ billMethodDataBundle: dataBundle }),
  setLogingEmail: (email) => set({ logingEmail: email }),
  setUseeBillstatusEmail: (email) => {
    set({ useeBillstatusEmail: email });
  },
  setPackageName: (packageName) => set({ packageName }),
  setUsageDetails: (data) => set({ usageDetails: data }),
  setDetailReportAvailability: (availablity) => set({ detailReportAvailability: availablity }),
  setGiftDataMobileNumber: (mobileNumber) => {
    console.log("Setting Mobile Number:", mobileNumber); // Console log added
    set({ giftDataMobileNumber: mobileNumber });
  }, // New setter function
}));

export default useStore;
