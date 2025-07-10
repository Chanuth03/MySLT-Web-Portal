// import Box from "@mui/material/Box";
// import homebackgroundImage from "../../assets/Images/HomeBackground.png";
// import AccountBalance from "../components/AccountBalance";
// import Banner from "../components/Banner";
// import ContentSection from "../components/ContentSection";
// import CustomAppBar from "../components/CustomAppBar";
// import CustomNavBar from "../components/CustomNavBar";
// import QuickAccessMenu from "../components/QuickAccessMenu";
// import ValueAddedServicesMenu from "../components/ValueAddedServicesMenu";
// import useStore from "../services/useAppStore";
// import Mobile from "../components/Mobile/Mobile";

// const Home = () => {
//   const { selectedNavbarItem } = useStore();
//   return (
//     <>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           backgroundImage: `url(${homebackgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           gap: 1,
//         }}
//       >
//         <CustomAppBar />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "start",
//             alignItems: "center",
//             gap: 1,
//             width: "100%",
//             maxWidth: "90vw",
//           }}
//         >
//           <CustomNavBar />
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 1,
//               width: "100%",
//             }}
//           >
//             <ValueAddedServicesMenu />
//             <AccountBalance />
//           </Box>
//           <Box
//             sx={{
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               justifyContent: "end",
//               gap: 1,
//             }}
//           >
//             <Box sx={{width: "75%",flexGrow:1 }}>
//               {selectedNavbarItem === "" && <ContentSection />}
//               {selectedNavbarItem === "Broadband" && <ContentSection />}
//               {selectedNavbarItem === "PeoTV" && <ContentSection />}
//               {selectedNavbarItem === "Voice" && <ContentSection />}
//               {selectedNavbarItem === "Mobile" && <Mobile/>}
//             </Box>
//             <Box sx={{ width: "25%", height: "100%",display:"flex",flexDirection:"column"}}>
//               <QuickAccessMenu />
//               <Banner />
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Home;
