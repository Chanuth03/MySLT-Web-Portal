import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

// Import components
import BalanceSection from "./BalanceSection";
import NavigationTabs, { ComponentType } from "./NavigationTabs";
import QuickReloadSection, { ReloadAmount } from "./QuickReloadSection";
import WelcomeSection from "./WelcomeSection";

// Import your existing components
import Call from "./Call";
import DataBalanceSection from "./DataBalanceSection";
import Sms from "./Sms";
import Voice from "./Voice";

// Define custom event interface
interface NavSelectionEvent extends CustomEvent {
  detail: {
    selectedItem: ComponentType;
  };
}

// Define main component props interface
interface MobitelInterfaceProps {
  phoneNumber?: string;
  balance?: number;
  currency?: string;
}

const MobitelInterface: React.FC<MobitelInterfaceProps> = ({
  phoneNumber = "0719205030",
  balance = 120.00,
  currency = "Rs"
}) => {
  // State to track which component to display
  const [activeComponent, setActiveComponent] = useState<ComponentType>("Data");

  // Listen for the custom event from CustomNavBar
  useEffect(() => {
    const handleNavSelection = (event: Event): void => {
      const navEvent = event as NavSelectionEvent;
      setActiveComponent(navEvent.detail.selectedItem);
    };

    window.addEventListener("navItemSelected", handleNavSelection);

    // Clean up
    return () => {
      window.removeEventListener("navItemSelected", handleNavSelection);
    };
  }, []);

  // Function to render the active component
  const renderActiveComponent = (): React.ReactNode => {
    switch (activeComponent) {
      case "Voice":
        return <Voice />;
      case "SMS":
        return <Sms />;
      case "Data":
        return <DataBalanceSection />;
      case "Call":
        return <Call />;
      default:
        return <DataBalanceSection />;
    }
  };

  // Handle balance section actions
  const handleGetLoan = (): void => {
    console.log("Get loan clicked");
    // Add your loan logic here
  };

  const handleReload = (): void => {
    console.log("Reload clicked");
    // Add your reload logic here
  };

  const handleMore = (): void => {
    console.log("More options clicked");
    // Add your more options logic here
  };

  // Handle quick reload purchase
  const handleBuyReload = (amount: ReloadAmount): void => {
    console.log(`Purchasing reload for ${currency} ${amount}`);
    // Add your reload purchase logic here
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="-20px"
      width="100%"
      borderRadius="20px"
      // minHeight="100vh"
      sx={{
        background: "#0F3B7A",
        fontFamily: "Poppins, sans-serif",
        p: 2,
      }}
    >
      {/* Red Background Container */}
      <Box
        width="100%"
        // maxWidth="400px"
        // sx={{
        //   background: "linear-gradient(135deg, #ff4444, #cc0000)",
        //   borderRadius: "20px",
        //   p: 2,
        //   boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        // }}
      >
        {/* Top Header Section */}
        <Box
          display="flex"
          mb={1.5}
          gap={1}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            padding: "0",
            width: "100%",
            position: "relative",
          }}
        >
          <WelcomeSection 
            phoneNumber={phoneNumber}
            isConnected={true}
          />
          <BalanceSection 
            balance={balance}
            currency={currency}
            onGetLoan={handleGetLoan}
            onReload={handleReload}
            onMore={handleMore}
          />
        </Box>

        
        {/* <NavigationTabs 
          activeComponent={activeComponent} 
          setActiveComponent={setActiveComponent} 
        /> */}

        {/* Main Content Area */}
        <Box
          sx={{
            backgroundColor: "#082444",
            borderRadius: "20px",
            p: 2,
            // mb: 2,
            minHeight: "300px",
          }}
        >
          {/* Navigation Tabs */}
          <NavigationTabs 
          activeComponent={activeComponent} 
          setActiveComponent={setActiveComponent} 
        />
          {renderActiveComponent()}
        </Box>

        {/* Quick Reload Section */}
        <QuickReloadSection 
          onBuyReload={handleBuyReload}
          currency={currency}
          reloadAmounts={[50, 100, 150, 200]}
        />
      </Box>
    </Box>
  );
};

export default MobitelInterface;