import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import HospitalView from './components/commonComponents/hospitalComponents/HospitalView'
import HospitalsList from './components/commonComponents/hospitalComponents/HospitalsList'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />

        <Route path='/hospitals' element={<HospitalsList/>}/>
        <Route path='/hospital/:id' element={<HospitalView/>}/>
      </Routes>
    </Router>
  )
}

export default App
