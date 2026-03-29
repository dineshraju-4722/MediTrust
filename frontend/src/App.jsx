import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import { UserHomePage } from './components/userComponents/UserHomePage'
import { DoctersList } from './components/userComponents/DoctersList'
import { DoctorsView } from './components/userComponents/DoctorsView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/doctor/:id/:date' element={<DoctorsView />} />
        <Route path='/home' element={<UserHomePage />} />
        <Route path='/doctors/:specialist' element={<DoctersList />} />
      </Routes>
    </Router>
  )
}

export default App
