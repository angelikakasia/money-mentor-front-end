import { useContext } from 'react'
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/Navbar.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx'
import SignInForm from './components/SignInForm/SignInForm.jsx'
import Landing from './components/Landing/Landing.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { UserContext } from './contexts/UserContext.jsx'

const App = () => {
    const { user } = useContext(UserContext)
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
