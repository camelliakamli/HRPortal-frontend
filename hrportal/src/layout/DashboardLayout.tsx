import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Box, Drawer } from '@mui/material';
import Header from '../components/Header'; 

const DashboardLayout: React.FC = () => {
  return (
    <Box className="flex">
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Sidebar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 0,
          display: 'flex',
          flexDirection: 'column', 
          marginLeft: '12px',   
          marginRight: '12px', 
          borderRadius: '8px', 
        }}
      >
        <Header />
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default DashboardLayout;
