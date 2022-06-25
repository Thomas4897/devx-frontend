// import { Box } from '@mui/material';
import { Grid } from '@mantine/core';
import React from 'react';
import AppShell from './AppShell';

function Layout(props) {
  const { children } = props;

  return (
    <Grid grow style={{height: "100vh"}}>
      <Grid.Col span={1}>
        <AppShell />
      </Grid.Col>
      <Grid.Col span={5} style={{ margin: "15%"}}>
          {children}
      </Grid.Col>
    </Grid>
  );
}

export default Layout;
