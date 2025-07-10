export interface AccountDetails {
  accountno: string;
  status: string;
  telephoneno: string;
}

export interface Service {
  serviceID: string;
  packageName: string;
  serviceStatus: string;
  serviceType: string;
  updatedDTM: string;
}

export interface ServiceDetailsAPIResponse {
  errorMessage: string;
  isSuccess: ServiceDetailsAPIResponse | null;
  accountCategory: string;
  accountNo: string;
  contactMobile: string;
  contactNamewithInit: string;
  listofBBService: Service[];
  listofPEOService: Service[];
  listofVoiceService: Service[];
  promotionName: string;
  promotionType: string;
}

export interface BroadbandPrepaidMainPackageDetails {
  OFFERING_ID: string;
  OFFERING_NAME: string;
  MYSLT_PKG_NAME: string;
  PRICE_LKR_WITH_TAX: number;
  DATA_VOLUME_GB?: string;
  VALIDITY?: number;
}

export interface BroadbandPrepaidAddOnPackageDetails {
  OFFERING_ID: string;
  OFFERING_NAME: string;
  ADDON_NAME: string;
  PRICE_LKR_WITH_TAX: number;
  DATA_VOLUME_GB?: string;
  VALIDITY?: number;
}

// Language state interface
export interface LanguageState {
  currentLanguage: 'en' | 'si' | 'ta';
}

// Helper function to get language from sessionStorage
const getStoredLanguage = (): 'en' | 'si' | 'ta' => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('appLanguage');
    if (stored && (stored === 'en' || stored === 'si' || stored === 'ta')) {
      return stored;
    }
  }
  return 'en';
};

// Helper function to store language in sessionStorage
const setStoredLanguage = (lang: 'en' | 'si' | 'ta') => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('appLanguage', lang);
  }
};

// Global language state variable
export const languageState: LanguageState = {
  currentLanguage: getStoredLanguage()
};

// Function to update language state
export const updateLanguageState = (newLanguage: 'en' | 'si' | 'ta') => {
  languageState.currentLanguage = newLanguage;
  setStoredLanguage(newLanguage);
};

// export interface WalletDetails {
//   balanceType: string;
//   balanceTypeName: string;
//   totalAmount: string;
//   balanceDetail: BalanceDetail[];
// }

export interface BalanceDetail {
  instanceId: string;
  amount: number;
  initialAmount: number;
  effectiveTime: string;
  expireTime: string;
  originalType: string;
  originalId: string;
}

export interface DataBalance {
  initialAmount: string;
  currentAmount: string;
  effectiveTime: string;
  expireTime: string;
  packageName: string;
  packageCategory: string;
}

export interface Transaction {
  id: string;
  subscriberNo: string;
  txnId: string;
  txnAmount: string;
  txnTime: string; // Original format: YYYYMMDDHHMMSS
  statusCode: string;
}

export interface BillingInquiry {
  accountNumber(arg0: string, accountNumber: any): unknown;
  telephoneNumber(arg0: string, telephoneNumber: any): unknown;
  amount: string;
  dueDate: string;
  lastPayment: string;
  billAmount: string;
  lastBillDate: string;
  paymentDueDate: string;
  lastPaymentDate: string;
  lastPaymentAmount: string;
  outstandingBalance: string;
}

export interface BillDetailsProps {
  selectedTab: string;
  billingDetails: BillingInquiry[];
}

export interface BillPaymentAPIResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  exceptionDetail: string | null;
  dataBundle: {
    listofbillingInquiryType: BillingInquiry[];
  };
  errorShow: string | null;
  errorCode: string | null;
}
export interface OfferDetail {
  telephoneno: string;
  eligibledate: string;
  expiredate: string;
  packageid: string;
  eligiblePeriod: string;
  packageName: string;
  refno: string;
  amount: string;
  imageURL: string;
}

export interface OfferAvailabilityAPIResponse {
  map(
    arg0: (offer: any) => { title: any; activated: any; image: any }
  ): unknown;
  isSuccess: boolean;
  errorMessage: string | null;
  exceptionDetail: string | null;
  dataBundle: OfferDetail[];
  errorShow: string | null;
  errorCode: string | null;
}

export interface PromotionData {
  imageURL: string;
  amount: any;
  packageName: any;
  title: string;
  activated: boolean;
  image: string;
}

export interface PromotionProps {
  telephoneNo: string;
}

export interface BillHistoryDetail {
  billDate: string;
  dueDate: string;
  amount: string;
  status: string;
}

export interface BillHistoryAPIResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  exceptionDetail: string | null;
  dataBundle: BillHistoryDetail[];
  errorShow: string | null;
  errorCode: string | null;
}

export interface Bill {
  outstanding: string;
  billValue: string;
  billMonth: string;
  payments: string;
}

export interface BillHistoryProps {
  selectedTab: string;
  billingHistory: {
    isSuccess: boolean;
    errorMessage: string | null;
    exceptionDetail: string | null;
    listofBillHistoryDetail: Bill[];
  };
  telephoneNo: string;
  accountNo: string;
}
export interface BannerData {
  url: string;
  bannerType: string;
  buttonName: string;
  WebViewTitle: string;
  screenFlag: string;
  webUrl: string;
  buttonColour: string;
  textColour: string;
  aspect_ratio_matching: string;
}
///////////////////////////////////////////////////////////////
//Postpaid Usage Summary
export interface PostpaidUsageDetails {
  status: string;
  package_summary: UsageSummary;
  usageDetails: UsageDetails[];
}

export interface UsageSummary {
  limit: string;
  used: string;
  volume_unit: string;
}

export interface UsageDetails {
  name: string;
  limit: number;
  remaining: number;
  used: number;
  percentage: number;
  volume_unit: string;
  expiry_date: string;
}
////////////////////////////////////////////////////////////////

//PostPaid Daily Usage

export interface DailyUsageDetails {
  date: string;
  displaydate: string;
  volumeunit: string;
  daily_total_usage: string;
  daily_percentage: number;
  usages: Usage[];
}

export interface Usage {
  offer_name: string;
  volume: string;
  percentage: number;
  sorter: number;
}

export interface RedeemVoucherAPIResponse {
  isSuccess: boolean;
  errorMessege?: string;
  exceptionDetail?: string;
  dataBundle: {
    status: string;
    message: string;
    path: string;
  };
  errorShow: string;
  errorCode: string | null;
}

///////////////////////////////////////////////////////////////
// gft data.ts
export interface GiftDataAPIResponse {
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: {
    status: string;
    message: string;
    path: string;
  } | null;
  errorShow: string | null;
  errorCode: string | null;
}

export interface ValidateDataGiftResponse {
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: {
    status: string;
    message: string;
    additionalInfo?: string;
  } | null;
  errorShow: string | null;
  errorCode: string | null;
}

//happy day
export interface HappyDayResponse {
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: {
    status: string;
    message: string;
    path?: string;
  } | null;
  errorShow: string | null;
  errorCode: string | null;
}
//Fault
export interface Fault {
  serviceName: string;
  faultRef: string;
  status: string;
  date: string;
}

export interface Asset {
  fault: Fault[] | null;
  serviceName: string;
}

export interface FaultDetailsAPIResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  dataBundle: {
    asset: Asset[];
  };
}

//Add complain
export interface CreateFaultResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  exceptionDetail: string | null;
  dataBundle: any | null;
  errorShow: string | null;
  errorCode: string | null;
}

export interface OtpGlobalState {
  dataBundle: string | null;
  userName: string | null;
  userType: string | null;
}

// RegisterResponse
export interface OtpResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  exceptionDetail: string | null;
  dataBundle: string | null;
  errorShow: string | null;
  errorCode: string | null;
}

// OtpVerificationResponse
export interface OtpVerificationResponse {
  errorMessage(arg0: string, errorMessage: any): unknown;
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: {
    accessToken: string;
    refreshToken: string;
    user_id: string | null;
    name: string | null;
  };
  errorShow: string | null;
  errorCode: string | null;
}

//PostPaidAddOnPackages
export interface PostpaidAddOnPackage {
  category: "string";
  addons: Addon[];
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  postprice: string;
  icon_url: string;
  recurring: boolean;
}

//GetExtraGB
export interface dataBundle {
  packageId: number;
  vasPackageType: string;
  volume: number;
  postPrice: string;
  prePrice: string;
  taxValue: string;
  validPeriod: number;
  periodUnit: string;
  description: string;
  volumeUnit: string;
  pre_paid_allowed: boolean;
  post_paid_allowed: boolean;
  serviceID: string;
  packageName: string | null;
}

export interface DataPlanProps {
  serviceID: string | null;
  packageName: string | null;
}

//protocol report
//##########################
export interface ProtocolData {
  protocol: string;
  presentage: number;
}

export interface ProtocolReportDetails {
  subscriberid: string;
  date: string;
  total: ProtocolData[];
  download: ProtocolData[];
  upload: ProtocolData[];
}

export interface MappedData {
  id: number;
  value: number;
  label: string;
  color: string;
}
//##########################

//CurrentPackage
export interface CurrentPackageDetails {
  bB_PACKAGE_CODE: string;
  bB_PACKAGE_NAME: string;
  monthlY_RENTAL: string;
  standarD_GB: string;
  freE_GB: string;
  description: string;
}

//##################################
//EnableAdvancedReport
export interface EnableAdvancedReportDetails {
  packageid: string;
  packagename: string;
  packageinfo: string;
  preprice: string;
  postprice: string;
  taxvalue: string;
}

//##################################
//GetPackageUpgrades
export interface BBPackage {
  BB_PACKAGE_NAME: string;
  BB_PACKAGE_CODE: string;
  MONTHLY_RENTAL: string;
  STANDARD_GB: string;
  FREE_GB: string;
  DESCRIPTION: string;
}

export type StandardPackages = BBPackage[][];
export type AnyPackages = BBPackage[][];
export type UnlimitedPackages = BBPackage[][];

export interface Upgrades {
  Standard: StandardPackages;
  Any: AnyPackages;
  Unlimited: UnlimitedPackages;
}
//##################################

export interface DataBundle {
  purchaseId: string;
  subscriberId: string;
  vasType: string;
  vasPackage: string;
  uamCat?: string | null;
  startTime?: string | null;
  validTill: string;
  duration: number;
  payType: string;
  payPrice: number; // Assuming it's a numeric value
  transactionState?: string | null;
  transactionTime: string;
  commitUser: string;
  channel: string;
  provisioningString?: string | null;
  basePackage?: string | null;
  failReason?: string | null;
  payParameters?: string | null;
  commitUserId: string; // Changed from commit_user_id to camelCase
  vasTypeName?: string | null;
}


export interface ApiResponse {
  isSuccess: boolean;
  errorMessege: string | null;
  exceptionDetail: string | null;
  dataBundle: DataBundle[];
  errorShow: string | null;
  errorCode: string | null;
}

