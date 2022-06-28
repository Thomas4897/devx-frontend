// import { Box } from '@mui/material';
import { Box, Grid } from '@mantine/core';
import React from 'react';
import AppShell from './AppShell';

function Layout(props) {
  const { children } = props;

  return (
    // <Grid grow style={{height: "100vh"}}>
    //   <Grid.Col span={1}>
    //     <AppShell />
    //   </Grid.Col>
    //   <Grid.Col span={5}>
    //       {children}
    //   </Grid.Col>
    // </Grid>
    <Box style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
      <Box style={{ }}>
      <AppShell />
      </Box>
      <Box >
      {children}
        </Box>
    </Box>
  );
}

export default Layout;
