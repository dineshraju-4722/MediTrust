import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import DocterHomePage from './components/doctorComponents/DocterHomePage'
import AdminPage from './components/doctorComponents/DoctorMainPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/doctorControls/:doctid' element={<DocterHomePage />} />
        <Route path='/doctorrole/:doctid' element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
