
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DataBalanceSection = () => {
  return (
    <Box mb={3}>
      {/* Main content section with Header inside */}
      <Box
        sx={{
          bgcolor: 'rgba(79, 99, 145, 0.7)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          p: 2,
          gap: 1,
          width: '96%',
          flexWrap: 'wrap',
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Header with DATA BALANCE text and chart icon */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#0F3B7A',
            borderRadius: '10px',
            p: 1,
            mb: 2,
          }}
        >
          <Box mr={1} display="flex" alignItems="center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3v18h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 17V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 17V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 17v-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Box>
          <Typography fontWeight="bold" color="white">
            DATA BALANCE
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: '#0d2d62',
            borderRadius: '10px',
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            flexWrap: 'nowrap', // ensure items stay on the same row
            width: '100%',
            height:"100%",
            margin: '0 auto',
          }}
        >
          {/* Left Column with Circle */}
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              border: '0.5px solid #395474',
              borderRadius: '10px',
              height: '320px', 
            }}
          >
            {/* Updated timestamp */}
            <Typography fontSize="12px" color="#e0e0e0" mb={3} fontWeight="500" textAlign="center">
              Updated as at 29/04/2025 11.32 AM
            </Typography>

            {/* Circular progress */}
            <Box position="relative" width="180px" height="180px" mb={3}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {/* Background circle - light gray */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e0e0e066"
                  strokeWidth="10"
                />
                {/* Progress circle - green */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="42" // 85% remaining
                  transform="rotate(-90 50 50)"
                />
              </svg>
              {/* Text inside circle */}
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography fontSize="42px" fontWeight="bold" color="white" lineHeight={1} fontFamily="Poppins, sans-serif">
                  85%
                </Typography>
                <Typography fontSize="14px" fontWeight="bold" color="white" fontFamily="Poppins, sans-serif">
                  REMAINING
                </Typography>
              </Box>
            </Box>

            {/* View Details Button */}
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                borderRadius: '30px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                px: 3,
                py: 1,
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              VIEW DETAILS
            </Button>
          </Box>

          {/* Right Column with Data Breakdown */}
          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              border: '0.5px solid #395474',
              borderRadius: '10px',
            }}
          >
            <Typography fontSize="16px" fontWeight="bold" color="white" mb={4} fontFamily="Poppins, sans-serif">
              DATA USAGE BREAKDOWN
            </Typography>

            {/* Day Data */}
            <Box mb={4}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="14px" fontWeight="bold" color="white" fontFamily="Poppins, sans-serif">
                  Day Data :
                </Typography>
                <Typography fontSize="14px" fontWeight="bold" color="white" fontFamily="Poppins, sans-serif">
                  1520 MB / 2050 MB
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '12px',
                  width: '100%',
                  bgcolor: '#aaaaaa',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '75%',
                    bgcolor: '#4caf50',
                    borderRadius: '6px',
                  }}
                />
              </Box>
            </Box>

            {/* Night Data */}
            <Box mb={4}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="14px" fontWeight="bold" color="white" fontFamily="Poppins, sans-serif">
                  Night Data :
                </Typography>
                <Typography fontSize="14px" fontWeight="bold" color="white" fontFamily="Poppins, sans-serif">
                  4520 MB / 5200 MB
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '12px',
                  width: '100%',
                  bgcolor: '#aaaaaa',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '87%',
                    bgcolor: '#4caf50',
                    borderRadius: '6px',
                  }}
                />
              </Box>
            </Box>

            {/* See All Button */}
            <Box display="flex" justifyContent="flex-end" mt="auto">
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: "Poppins, sans-serif",
                  px: 3,
                  py: 1,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                SEE ALL
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataBalanceSection;