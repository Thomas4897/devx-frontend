// import NavBar from '../src/component/NavBar'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShell from './component/AppShell';
import Login from './component/pages/LoginPage2';
import CreateUser from './component/pages/CreateUserPage';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux';
import UserHomePage from './component/pages/UserHomePage';

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<AppShell />} />
          <Route path='login' element={<Login />} />
          <Route path='create-user' element={<CreateUser />} />
          <Route path='user-page' element={<UserHomePage />} />
        </Routes>
      </BrowserRouter >
    </ReduxProvider>
  );
}

export default App;
