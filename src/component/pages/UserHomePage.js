import { Box, Button } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import APIaxios from '../../Axios'
import { useUser } from '../../redux/userState'
import Layout from '../Layout'
import PortfolioCard from '../PortfolioCard'

export default function UserHomePage() {
  const { user } = useUser();
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(
    () => {
      APIaxios.post('/portfolioItems/get-user-portfolio-items', { userId: user.id})
        .then((response) => {
          console.log(response.data);
          setPortfolioData(response.data);
        })
        .catch((error) => console.log('error: ', error));
    },
    [],
  );

  return (
    <Layout>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {/* <Box mt={50} style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <Button>+ Add Portfolio Card</Button>
        </Box> */}
        <Box className="example" style={{ height: "100vh", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", overflow: "scroll" }}>
          {portfolioData.map((e) => {
            return (
              <Box key={e.id} mt={20} style={{ width: "400px" }} >
                <PortfolioCard exampleCard={e} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}
