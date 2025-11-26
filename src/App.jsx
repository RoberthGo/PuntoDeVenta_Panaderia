import { useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Main from './pages/Main'
import EmployeeCRUDPage from './pages/EmployeeCRUDPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="app">
      {isAuthenticated ? <Main /> : <Login onLogin={handleLogin} />}
    </div>
  )
}

export default App
