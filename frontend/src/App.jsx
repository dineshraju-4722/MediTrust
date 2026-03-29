import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/commonComponents/LoginPage'
import { DoctersList } from './components/userComponents/DoctersList'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/doctors/:specialist' element={<DoctersList />} />
      </Routes>
    </Router>
  )
}

export default App
