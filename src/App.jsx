
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

import {Routes,Route} from 'react-router-dom'
import { useContext } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Pages/Dashboard';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Projects from './Pages/Projects';
import Reg from './Pages/Reg';
import Auth from './Pages/Auth';
import { TokenAuthContext } from '../Context Api/AuthContext';

function App() {

  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)


  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/' element={<Landing/>} />
        <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>} />
        <Route path='/log' element={<Login/>}/>
        <Route path='/projects' element={authStatus?<Projects/>:<Landing/>} />
        <Route path='/reg' element={<Reg/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
