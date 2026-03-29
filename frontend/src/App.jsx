import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import { UserHomePage } from './components/userComponents/UserHomePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<UserHomePage />} />
      </Routes>
    </Router>
  )
}

export default App
