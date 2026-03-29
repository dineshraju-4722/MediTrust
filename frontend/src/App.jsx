import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import { UserHomePage } from './components/userComponents/UserHomePage'
import { DoctersList } from './components/userComponents/DoctersList'
import { DoctorsView } from './components/userComponents/DoctorsView'
import AppointmentPage from './components/userComponents/AppointmentPage' 
import HospitalView from './components/commonComponents/hospitalComponents/HospitalView'
import HospitalsList from './components/commonComponents/hospitalComponents/HospitalsList'
import DocterHomePage from './components/doctorComponents/DocterHomePage'
import AdminPage from './components/doctorComponents/DoctorMainPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/doctor/:id/:date' element={<DoctorsView />} />
        <Route path='/home' element={<UserHomePage />} />
        <Route path='/doctors/:specialist' element={<DoctersList />} />
        <Route path='/booking/:date/:doctid/:userid/:time' element={<AppointmentPage />} />

        <Route path='/hospitals' element={<HospitalsList/>}/>
        <Route path='/hospital/:id' element={<HospitalView/>}/>
        <Route path='/doctorControls/:doctid' element={<DocterHomePage />} />
        <Route path='/doctorrole/:doctid' element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
