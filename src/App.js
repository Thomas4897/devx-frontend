// import NavBar from '../src/component/NavBar'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/pages/LoginPage2';
import CreateUser from './component/pages/CreateUserPage';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux';
import UserHomePage from './component/pages/UserHomePage';
import HomePage from './component/pages/HomePage';
import AddPortfolioCard from './component/pages/AddPortfolioPage';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ReduxProvider store={store}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <BrowserRouter >
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<Login />} />
            <Route path='create-user' element={<CreateUser />} />
            <Route path='user-page' element={<UserHomePage />} />
            <Route path='add-portfolio-card' element={<AddPortfolioCard />} />
          </Routes>
        </BrowserRouter >
      </MantineProvider>
      </ColorSchemeProvider>
    </ReduxProvider>
  );
}

export default App;
