import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { languageState, updateLanguageState } from '../types/types';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(languageState.currentLanguage);

  // Initialize language from variable on component mount
  useEffect(() => {
    if (languageState.currentLanguage !== i18n.language) {
      i18n.changeLanguage(languageState.currentLanguage);
      setCurrentLang(languageState.currentLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    const selectedLanguage = event.target.value as 'en' | 'si' | 'ta';
    
    // Update the global variable and sessionStorage
    updateLanguageState(selectedLanguage);
    
    // Update i18n
    i18n.changeLanguage(selectedLanguage);
    
    // Update local state to trigger re-render
    setCurrentLang(selectedLanguage);
  };

  const languages: Language[] = [
    { code: 'en', name: t('languages.english'), flag: '🇺🇸' },
    { code: 'si', name: t('languages.sinhala'), flag: '🇱🇰' },
    { code: 'ta', name: t('languages.tamil'), flag: '🇱🇰' }
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
      <LanguageIcon sx={{ color: 'white', fontSize: 20 }} />
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 120,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiSelect-icon': {
            color: 'white',
          },
        }}
      >
        <Select
          value={currentLang}
          onChange={handleLanguageChange}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#0F3B7A',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                },
              },
            },
          }}
        >
          {languages.map((language: Language) => (
            <MenuItem key={language.code} value={language.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{language.flag}</span>
                <Typography variant="body2">{language.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;