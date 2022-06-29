// import { Box } from '@mui/material';
import { Box, Grid } from '@mantine/core';
import React from 'react';
import AppShell from './AppShell';

function Layout(props) {
  const { children } = props;

  return (
    <Box style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
      <Box style={{ }}>
      <AppShell />
      </Box>
      <Box style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {children}
        </Box>
    </Box>
  );
}

export default Layout;
