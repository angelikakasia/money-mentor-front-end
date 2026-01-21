// app.jsx
import './App.css';
import { useContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/Navbar.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx'
import SignInForm from './components/SignInForm/SignInForm.jsx'
import Landing from './components/Landing/Landing.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import * as categoryService from "./services/categoryService.js"
import { UserContext } from './contexts/UserContext.jsx'

const App = () => {
    const { user } = useContext(UserContext)
    const [categories, setCategories] =useState([]);
    console.log(categories)
    useEffect(() => {
    const fetchAllCategories = async () => {
      const categoriesData = await categoryService.index();
      console.log("categories:", categoriesData);
      setCategories(categoriesData);
    };
    if (user) fetchAllCategories();
  }, [user]);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Landing />} />
                <Route path='/sign-up' element={<SignUpForm />} />
                <Route path='/sign-in' element={<SignInForm />} />
            </Routes>
        </>
    )

}

export default App
