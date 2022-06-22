// import NavBar from '../src/component/NavBar'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShell from './component/AppShell';
import Login from './component/pages/LoginPage2';
import CreateUser from './component/pages/CreateUserPage';

function App() {
  return (
    <BrowserRouter >
    <Routes>
        <Route path='/' element={<AppShell />}/>
        <Route path='login' element={<Login />}/>
        <Route path='create-user' element={<CreateUser />}/>
    </Routes>
    </BrowserRouter >

  );
}

export default App;
