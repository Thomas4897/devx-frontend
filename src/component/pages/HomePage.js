import { Box } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import APIaxios from '../../Axios'
import Layout from '../Layout'
import PortfolioCard from '../PortfolioCard'

export default function HomePage() {
    const [portfolioData, setPortfolioData] = useState([]);

    // This is what runs after the first render:
    useEffect(
      () => {
        APIaxios.get('/portfolioItems/get-all-portfolio-items')
          .then((response) => {
            setPortfolioData(response.data);
        })
          .catch((error) => console.log('error: ', error));
      },
      [],
    );

  return (
    <Layout>
      <Box style={{ display: "flex", flexDirection: "column"}}>
        <Box className="example" style={{height: "100vh", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", overflow: "scroll"}}>
      {portfolioData.map((e) => {
           return (
            <Box key={e.id} m={10} mt={40} style={{ width: "400px"}} >
                <PortfolioCard exampleCard={e} image={e.author.authorImage}/>
            </Box>
        )})}
        </Box>
      </Box>
    </Layout>
  )
}
