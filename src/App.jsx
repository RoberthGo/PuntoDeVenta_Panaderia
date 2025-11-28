import { useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Main from './pages/Main'
import { authService } from './services'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = async (loginData) => {
    try {
      setError(null)
      console.log('Login data received:', loginData); // Debug log
      
      const response = await authService.login(loginData.nombreUsuario, loginData.clave)
      
      if (response) {
        setUserData(response)
        setIsAuthenticated(true)
      } else {
        throw new Error('No se recibieron datos del usuario')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.message || 'Usuario o contraseña incorrectos')
      setIsAuthenticated(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setUserData(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Main userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} error={error} />
      )}
    </div>
  )
}

export default App
