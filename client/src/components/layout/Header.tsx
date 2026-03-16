import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  InputBase,
  alpha,
  styled,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Mic as MicIcon,
  Translate as TranslateIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface HeaderProps {
  open: boolean;
  onDrawerToggle: () => void;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ open, onDrawerToggle, onLanguageChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isListening, setIsListening] = useState(false);
  const { t } = useTranslation();
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    onLanguageChange(language);
    handleLanguageMenuClose();
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    recognition.start();
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      // Handle the transcript (e.g., update search input)
      console.log('Voice input:', transcript);
    };
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('dashboard.title')}
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={t('search.placeholder')}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <IconButton
          color="inherit"
          onClick={handleVoiceInput}
          sx={{ mr: 1 }}
        >
          <MicIcon color={isListening ? 'error' : 'inherit'} />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={handleLanguageMenuOpen}
            aria-label="select language"
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => handleLanguageSelect('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('hi')}>हिंदी</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('bn')}>বাংলা</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('te')}>తెలుగు</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('ta')}>தமிழ்</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('mr')}>मराठी</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('gu')}>ગુજરાતી</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('kn')}>ಕನ್ನಡ</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('ml')}>മലയാളം</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('pa')}>ਪੰਜਾਬੀ</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('or')}>ଓଡ଼ିଆ</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('as')}>অসমীয়া</MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('ur')}>اردو</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 