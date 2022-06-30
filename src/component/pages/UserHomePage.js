import { Box } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import APIaxios from '../../Axios'
import { useUser } from '../../redux/userState'
import Layout from '../Layout'
import PortfolioCard from '../PortfolioCard'

export default function UserHomePage() {
  const { user } = useUser();
  const [portfolioData, setPortfolioData] = useState([]);
  const [authorImage, setAuthorImage] = useState(null)
  const homePage = false;

  useEffect(
    () => {
      APIaxios.post('/portfolioItems/get-user-portfolio-items', { userId: user.id })
        .then((response) => {
          setPortfolioData(response.data);
          setAuthorImage(response.data[0].author.authorImage)
        })
        .catch((error) => console.log('error: ', error));
    },
    [],
  );

  return (
    <Layout>
      <Box style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
        <Box pl={20}>
          <h2>Welcome Back, {user ? user.firstName : ""}!</h2>
        </Box>
        <Box pb={25} className="example" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", overflow: "scroll" }}>
          {portfolioData.map((e) => {
            return (
              <Box key={e.id} m={10} mt={40} style={{ height: "100%", width: "400px" }} >
                <PortfolioCard homePage={homePage} exampleCard={e} image={authorImage ? authorImage : null} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}
