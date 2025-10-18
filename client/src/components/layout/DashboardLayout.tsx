import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
  }
}

const theme = createTheme({
  drawerWidth: 240,
  // ... rest of your theme configuration
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${theme.drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { i18n } = useTranslation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        open={open}
        onDrawerToggle={handleDrawerToggle}
        onLanguageChange={handleLanguageChange}
      />
      <Sidebar open={open} onDrawerToggle={handleDrawerToggle} />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout; 