import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/doctor/:id/:date' element={<DoctorsView />} />
      </Routes>
    </Router>
  )
}

export default App
