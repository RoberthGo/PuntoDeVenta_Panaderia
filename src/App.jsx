import { useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Main from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [userData, setUserData] = useState(null)

  const handleLogin = (loginData) => {
    const user = {
      id: 1,
      username: loginData.login,
      role: 'admin', // This would come from API response
      email: `${loginData.login}@panaderia.com`,
      fullName: loginData.login,
      loginTime: new Date().toISOString()
    }
    
    setUserData(user)
    setIsAuthenticated(true)
    
    // Optional: Store in localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(user))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
    localStorage.removeItem('userData')
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Main userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
