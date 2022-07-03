import { Box } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import APIaxios from '../../Axios'
import { useUser } from '../../redux/userState'
import Layout from '../Layout'
import PortfolioCard from '../PortfolioCard'

export default function HomePage() {
  const { user } = useUser();
  const [portfolioData, setPortfolioData] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [updateFavorites, setUpdatedFavorites] = useState(true);
  const homePage = true;


  // This is what runs after the first render:
  useEffect(() => {
    const getAllPortfolioItems = async () => {
      APIaxios.post('/portfolioItems/get-all-portfolio-items', {
        user
      })
        .then((response) => {
          setUserFavorites(response.data.userFavorites)
          setPortfolioData(response.data.foundPortfolioItems);
        })
        .catch((error) => console.log('error: ', error));
    };
    getAllPortfolioItems();
  }, [user, updateFavorites]
  );



  return (
    <Layout>
      <Box style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
        <Box pl={20}>
          <h2>DevX Community</h2>
        </Box>
          <Box pb={25} className="example" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", overflow: "scroll" }}>
            {portfolioData.map((e) => {
              return (
                <Box key={e.id} m={10} mt={40} style={{ width: "400px" }} >
                  <PortfolioCard exampleCard={e} image={e.author.authorImage} homePage={homePage} userFavorites={userFavorites} updateFavorites={updateFavorites} setUpdatedFavorites={setUpdatedFavorites} />
                </Box>
              )
            })}
          </Box>
      </Box>
    </Layout>
  )
}
